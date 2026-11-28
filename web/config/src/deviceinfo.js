// ThinkKira Loader – Geräte-Infos auslesen.
// 1) Im Bootloader (esptool): Chip, Revision, Quarz, MAC, Flash-Chip, PSRAM, Partitionen, installierte Firmware.
// 2) In der laufenden Firmware (Meshtastic-Protokoll + ThinkKira-Befehl "info" auf Port 287):
//    Name, Knoten-Nr., Firmware, Hardware, Region, Funkmodus, GPS-Version, Akku, Speicher.
// SPDX-License-Identifier: GPL-3.0-only
import { MeshDevice, Protobuf } from "@meshtastic/core";
import { TransportWebSerial } from "@meshtastic/transport-web-serial";

const KIRA_PORT = 287;
const kb = (n) => (n >= 1024 ? (n / 1024).toFixed(n % 1024 ? 2 : 0).replace(".", ",") + " MB" : n + " KB");
const hex = (n, w = 8) => "0x" + n.toString(16).padStart(w, "0");
const cstr = (bytes) => new TextDecoder().decode(bytes.subarray(0, Math.max(0, bytes.indexOf(0) < 0 ? bytes.length : bytes.indexOf(0))));
const u32 = (b, o) => (b[o] | (b[o + 1] << 8) | (b[o + 2] << 16) | (b[o + 3] << 24)) >>> 0;

const FLASH_VENDORS = { 0x20: "XMC / Micron", 0x68: "Boya", 0xc8: "GigaDevice", 0xef: "Winbond", 0xa1: "Fudan", 0x85: "Puya", 0x5e: "Zbit", 0x0b: "XTX", 0x1c: "EON", 0xc2: "Macronix" };
const PART_TYPES = { 0: "App", 1: "Daten" };
const APP_SUB = { 0x00: "factory", 0x10: "ota_0", 0x11: "ota_1", 0x20: "test" };
const DATA_SUB = { 0x00: "otadata", 0x01: "phy", 0x02: "nvs", 0x03: "coredump", 0x04: "nvs_keys", 0x05: "efuse", 0x81: "fat", 0x82: "spiffs", 0x83: "littlefs" };

export function parsePartitions(buf) {
  const parts = [];
  for (let o = 0; o + 32 <= buf.length; o += 32) {
    if (buf[o] !== 0xaa || buf[o + 1] !== 0x50) break;
    const type = buf[o + 2],
      sub = buf[o + 3];
    parts.push({
      label: cstr(buf.subarray(o + 12, o + 28)),
      type,
      sub,
      typeName: PART_TYPES[type] ?? "Typ " + type,
      subName: (type === 0 ? APP_SUB[sub] : DATA_SUB[sub]) ?? hex(sub, 2),
      offset: u32(buf, o + 4),
      size: u32(buf, o + 8),
    });
  }
  return parts;
}

export function parseAppDesc(buf) {
  // App-Image: 24 Byte Kopf + 8 Byte Segmentkopf, danach esp_app_desc_t
  if (buf[0] !== 0xe9 || u32(buf, 32) !== 0xabcd5432) return null;
  return {
    version: cstr(buf.subarray(48, 80)),
    project: cstr(buf.subarray(80, 112)),
    time: cstr(buf.subarray(112, 128)),
    date: cstr(buf.subarray(128, 144)),
    idf: cstr(buf.subarray(144, 176)),
  };
}

// Liest alles, was im Bootloader-Modus geht. loader: verbundener ESPLoader (nach main()).
export async function readBootInfo(loader) {
  const c = loader.chip;
  const info = { sections: [] };
  const chipRows = [];
  chipRows.push(["Chip", await c.getChipDescription(loader)]);
  chipRows.push(["Funktionen", (await c.getChipFeatures(loader)).join(", ")]);
  chipRows.push(["Quarz", (await c.getCrystalFreq(loader)) + " MHz"]);
  chipRows.push(["MAC-Adresse", await c.readMac(loader)]);
  info.sections.push(["Chip", chipRows]);

  const memRows = [];
  const id = await loader.readFlashId();
  const manuf = id & 0xff,
    dev = (id >> 8) & 0xffff;
  const sizeStr = loader.DETECTED_FLASH_SIZES[(id >> 16) & 0xff];
  info.flashSize = sizeStr;
  memRows.push(["Flash-Chip", (FLASH_VENDORS[manuf] ?? "Hersteller " + hex(manuf, 2)) + ", ID " + hex(dev, 4)]);
  memRows.push(["Flash-Größe", sizeStr ? sizeStr.replace("MB", " MB").replace("KB", " KB") : "unbekannt"]);
  const psramCap = await c.getPsramCap(loader);
  memRows.push(["PSRAM (im Chip)", { 0: "keins", 1: "8 MB", 2: "2 MB" }[psramCap] ?? "unbekannt (" + psramCap + ")"]);
  info.sections.push(["Speicher", memRows]);

  // Partitionstabelle + installierte Firmware
  const table = parsePartitions(await loader.readFlash(0x8000, 0xc00));
  if (table.length) {
    const fwRows = [];
    for (const p of table.filter((p) => p.type === 0)) {
      const desc = parseAppDesc(await loader.readFlash(p.offset, 256));
      fwRows.push([
        "Partition „" + p.label + "“",
        desc ? `${desc.version || "?"} (${desc.project}, gebaut ${desc.date} ${desc.time}, IDF ${desc.idf})` : "leer / keine gültige Firmware",
      ]);
    }
    info.sections.push(["Installierte Firmware", fwRows]);
    info.sections.push([
      "Partitionen",
      table.map((p) => [p.label, `${p.typeName}/${p.subName} · ab ${hex(p.offset, 6)} · ${kb(Math.round(p.size / 1024))}`]),
    ]);
  } else {
    info.sections.push(["Installierte Firmware", [["Partitionstabelle", "nicht gefunden – Gerät ist leer oder gelöscht"]]]);
  }
  return info;
}

function timeout(ms, text) {
  return new Promise((_, rej) => setTimeout(() => rej(Object.assign(new Error(text), { de: true })), ms));
}

// Verbindet sich nach dem Neustart mit der laufenden Firmware und fragt alles ab.
// Gibt null zurück, wenn keine Meshtastic-/ThinkKira-Firmware antwortet.
export async function readRuntimeInfo(port, onStatus = () => {}, waitMs = 9000) {
  onStatus("Warte auf den Start der Firmware …");
  await new Promise((r) => setTimeout(r, waitMs));
  onStatus("Frage die laufende Firmware ab …");
  const transport = await TransportWebSerial.createFromPort(port, 115200);
  const device = new MeshDevice(transport);
  const d = { config: {}, kira: null, kiraInfo: null, fsTotal: null };
  const ev = device.events;
  ev.onMyNodeInfo.subscribe((i) => (d.my = i));
  ev.onDeviceMetadataPacket.subscribe((m) => (d.meta = m.data));
  ev.onNodeInfoPacket.subscribe((n) => {
    if (d.my && n.num === d.my.myNodeNum) d.me = n;
    else (d.nodes ??= new Set()).add(n.num);
  });
  ev.onConfigPacket.subscribe((c) => c.payloadVariant.case && (d.config[c.payloadVariant.case] = c.payloadVariant.value));
  ev.onMeshPacket.subscribe((p) => {
    const v = p?.payloadVariant?.case === "decoded" ? p.payloadVariant.value : null;
    if (!v || v.portnum !== KIRA_PORT) return;
    const f = new TextDecoder().decode(v.payload).split("|");
    if (f[0] === "m") d.kira = { mode: f[1], version: f[2] };
    if (f[0] === "i") d.kiraInfo = f.slice(1);
    if (f[0] === "f") d.fsTotal = +f[1];
  });
  try {
    const configured = new Promise((res) => ev.onDeviceStatus.subscribe((st) => st === 7 && res()));
    device.configure().catch(() => {}); // löst erst spät auf – wir warten auf den Status „konfiguriert“
    await Promise.race([configured, timeout(30000, "Keine Antwort von der Firmware.")]);
    const send = (t) => device.sendPacket(new TextEncoder().encode(t), KIRA_PORT, "self", 0, false, false).catch(() => {});
    send("get");
    send("info");
    await new Promise((r) => setTimeout(r, 2500));
  } catch {
    if (!d.my) {
      await device.disconnect().catch(() => {});
      return null;
    }
  }
  await device.disconnect().catch(() => {});
  return toSections(d);
}

function toSections(d) {
  const P = Protobuf;
  const sections = [];
  const rows = [];
  const user = d.me?.user;
  if (user) rows.push(["Name", `${user.longName} (${user.shortName})`]);
  if (d.my) rows.push(["Knoten-Nr.", "!" + d.my.myNodeNum.toString(16).padStart(8, "0")]);
  if (d.meta) {
    rows.push(["Meshtastic-Firmware", d.meta.firmwareVersion]);
    rows.push(["Hardware", d.meta.hwModel === 107 ? "Elecrow ThinkNode M5" : (P.Mesh.HardwareModel[d.meta.hwModel] ?? String(d.meta.hwModel))]);
    rows.push(["Kann", [d.meta.hasWifi && "WLAN", d.meta.hasBluetooth && "Bluetooth", d.meta.hasEthernet && "Ethernet"].filter(Boolean).join(", ") || "–"]);
  }
  if (d.config.device) rows.push(["Rolle", P.Config.Config_DeviceConfig_Role[d.config.device.role] ?? String(d.config.device.role)]);
  if (d.config.lora) {
    rows.push(["Region", P.Config.Config_LoRaConfig_RegionCode[d.config.lora.region] ?? String(d.config.lora.region)]);
    rows.push(["Funk-Profil", P.Config.Config_LoRaConfig_ModemPreset[d.config.lora.modemPreset] ?? String(d.config.lora.modemPreset)]);
  }
  rows.push(["Bekannte Knoten", String(d.nodes?.size ?? 0)]);
  sections.push(["Laufende Firmware", rows]);

  if (d.kira || d.kiraInfo) {
    const k = [];
    if (d.kira) {
      k.push(["ThinkKira-Version", d.kira.version]);
      k.push(["Funkmodus", d.kira.mode === "kira" ? "Kira-Funk" : "Meshtastic"]);
    }
    const i = d.kiraInfo;
    if (i) {
      const [, gps, flashKB, flashBuildKB, appKB, appSlotKB, fsUsedKB, psramEfuseMB, psramKB, heapKB, bat, mv, usb] = i;
      k.push(["GPS-Hardware", gps === "v2" ? "v2.0 (AG3352)" : "v1.0 (L76K)"]);
      k.push(["Flash (laut Firmware)", kb(+flashKB) + (flashBuildKB !== flashKB ? " (Firmware gebaut für " + kb(+flashBuildKB) + ")" : "")]);
      k.push(["Firmware-Größe", `${kb(+appKB)} von ${kb(+appSlotKB)} (frei ${kb(+appSlotKB - +appKB)})`]);
      k.push(["Dateisystem", kb(+fsUsedKB) + (d.fsTotal ? " von " + kb(d.fsTotal) + " belegt" : " belegt")]);
      k.push(["PSRAM", `${psramEfuseMB} MB eingebaut, ${+psramKB ? kb(+psramKB) + " genutzt" : "nicht genutzt"}`]);
      k.push(["Freier Arbeitsspeicher", kb(+heapKB)]);
      if (+bat >= 0) k.push(["Akku", `${bat} % (${(+mv / 1000).toFixed(2).replace(".", ",")} V)${usb === "1" ? ", USB angeschlossen" : ""}`]);
    }
    sections.push(["ThinkKira", k]);
  } else {
    sections.push(["ThinkKira", [["ThinkKira-Modul", "nicht gefunden – auf dem Gerät läuft keine (aktuelle) ThinkKira-Firmware"]]]);
  }
  return sections;
}
