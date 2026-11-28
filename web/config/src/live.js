// ThinkKira – schlanke Geräteverbindung (USB, Bluetooth, WLAN) für ThinkKira-Befehle auf Port 287.
// Genutzt vom Designer für Live-Änderungen; der Konfigurator nutzt openWlan() für „Per WLAN verbinden“.
// SPDX-License-Identifier: GPL-3.0-only
import "./shim.js";
import { MeshDevice } from "@meshtastic/core";
import { TransportWebSerial } from "@meshtastic/transport-web-serial";
import { TransportWebBluetooth } from "@meshtastic/transport-web-bluetooth";
import { TransportHTTP } from "@meshtastic/transport-http";
import { deFehler } from "./form.js";

export const KIRA_PORT = 287;
const CONFIGURED = 7;
const DISCONNECTED = 2;

// Adresse säubern: „https://192.168.178.40/“ → „192.168.178.40“
export const cleanHost = (h) =>
  String(h ?? "")
    .trim()
    .replace(/^https?:\/\//, "")
    .replace(/\/.*$/, "");

// WLAN: Das Gerät spricht HTTPS mit eigenem Zertifikat. Die Bibliothek fragt nur alle 3 s nach neuen
// Daten – für Antworten viel zu langsam, daher öfter und direkt nach jedem Senden.
// Wirft einen Fehler mit .unreachable = true, wenn das Gerät nicht erreichbar ist (Zertifikat nicht bestätigt?).
export async function openWlan(host) {
  host = cleanHost(host);
  if (!host) throw deFehler("Bitte die Adresse des Geräts eingeben (steht auf dem Gerät unter Menü → WLAN & Web).");
  let t;
  try {
    t = await TransportHTTP.create(host, true);
  } catch {
    throw Object.assign(deFehler(`Das Gerät unter ${host} ist nicht erreichbar.`), { unreachable: true });
  }
  if (t.interval) clearInterval(t.interval);
  t.interval = setInterval(() => void t.safePoll(), 400);
  const write = t.writeToRadio.bind(t);
  t.writeToRadio = async (d) => {
    await write(d);
    setTimeout(() => void t.safePoll(), 30);
  };
  return t;
}

export class KiraLink {
  // onText(text): jede ThinkKira-Antwort; onStatus(text, connected): Verbindungszustand
  constructor(onText, onStatus) {
    this.onText = onText;
    this.onStatus = onStatus;
    this.device = null;
    this.kind = null;
  }

  get connected() {
    return !!this.device && this.ready;
  }

  async connect(kind, host) {
    if (this.device) await this.disconnect();
    this.onStatus("verbinde …", false);
    try {
      const transport = kind === "serial" ? await TransportWebSerial.create(115200) : kind === "wlan" ? await openWlan(host) : await TransportWebBluetooth.create();
      const device = new MeshDevice(transport);
      this.device = device;
      this.transport = transport;
      this.kind = kind;
      this.ready = false;
      device.events.onMeshPacket.subscribe((p) => {
        const v = p?.payloadVariant?.case === "decoded" ? p.payloadVariant.value : null;
        if (v && v.portnum === KIRA_PORT) this.onText(new TextDecoder().decode(v.payload));
      });
      device.events.onDeviceStatus.subscribe((s) => {
        if (s === CONFIGURED && !this.ready) {
          this.ready = true;
          this.onStatus("verbunden", true);
        } else if (s === DISCONNECTED && this.device === device && !this.closing) {
          this.cleanup(device, transport);
          this.onStatus("Verbindung verloren", false);
        }
      });
      device.configure().catch(() => {}); // löst erst spät auf; „verbunden“ kommt über den Status
    } catch (e) {
      this.device = null;
      this.onStatus("nicht verbunden", false);
      throw e;
    }
  }

  // Befehl ans Gerät (Meshtastic-Warteschlange hält die Reihenfolge ein)
  send(cmd) {
    if (!this.device) return;
    this.device.sendPacket(new TextEncoder().encode(cmd), KIRA_PORT, "self", 0, false, false).catch((e) => console.warn(e));
  }

  async cleanup(device, transport) {
    if (this.device === device) {
      this.device = null;
      this.ready = false;
    }
    try {
      device?.complete?.();
    } catch {}
    try {
      await device?.transport?.toDevice?.close();
    } catch {}
    try {
      await transport?.disconnect();
    } catch {}
  }

  async disconnect() {
    this.closing = true;
    await this.cleanup(this.device, this.transport);
    this.closing = false;
    this.onStatus("nicht verbunden", false);
  }
}
