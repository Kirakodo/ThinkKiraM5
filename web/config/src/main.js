// ThinkKira Konfigurator
// Verbindet sich per USB (Web Serial) oder Bluetooth (Web Bluetooth) mit dem Gerät und
// bearbeitet alle Einstellungen. Einbettung: <div id="tk-config"></div> + dieses Modul + CSS.
// SPDX-License-Identifier: GPL-3.0-only
import "./shim.js";
import "./style.css";
import { MeshDevice, Protobuf } from "@meshtastic/core";
import { TransportWebSerial } from "@meshtastic/transport-web-serial";
import { TransportWebBluetooth } from "@meshtastic/transport-web-bluetooth";
import { create, toJson, fromJson, clone, toBinary } from "@bufbuild/protobuf";
import { renderMessage, el, group, fehlerText, deFehler } from "./form.js";
import { SECTION_LABELS } from "./labels.js";
import { parseUi, uiCommand, menuCommands, parseDesign, exportDesign, pickFile } from "./designer.js";
import { parseMenu } from "./menu-model.js";

const P = Protobuf;
const STATUS_CONFIGURED = 7;

const state = {
  device: null,
  status: "getrennt",
  myNodeNum: 0,
  metadata: null,
  config: {}, // case -> Nachricht
  moduleConfig: {},
  channels: [],
  nodes: new Map(),
  waypoints: new Map(),
  wifiNets: null, // Ergebnis der WLAN-Suche: [{ ssid, rssi, open }]
  wifiScanning: false,
  kira: null, // { mode, version } vom Gerät
  kiraStats: null, // { counters, heard: [], range: [] }
  kiraPending: null, // gesammelte Antwortzeilen von "stats"
  page: "device",
  dirty: false,
};

let root;

// ---------- Verbindung ----------

async function connect(kind) {
  try {
    setStatus("verbinde …");
    const transport = kind === "serial" ? await TransportWebSerial.create(115200) : await TransportWebBluetooth.create();
    const device = new MeshDevice(transport);
    state.device = device;
    state.transport = transport;
    state.config = {};
    state.moduleConfig = {};
    state.channels = [];
    state.nodes.clear();
    state.kira = null;
    state.kiraStats = null;
    state.kiraStatsAsked = false;
    state.wifiNets = null;
    state.ui = null;
    state.menuText = state.menuBuf = null;
    state.devWps = state.wpBuf = null;
    state.wpAsked = false;
    state.mapInfo = undefined;
    state.mapAsked = false;

    device.events.onDeviceStatus.subscribe((s) => {
      if (s === STATUS_CONFIGURED) {
        setStatus("verbunden");
        kiraSend("get");
        kiraSend("ui");
        kiraSend("mg");
      }
      else if (s === 2 && state.device === device && !state.closing) {
        // Gerät weg (Kabel gezogen, Neustart, Bluetooth aus): aufräumen
        closeConnection(device, transport);
        resetConnection("Verbindung verloren");
      }
      else if (s === 6) setStatus("lese Einstellungen …");
    });
    device.events.onMyNodeInfo.subscribe((i) => (state.myNodeNum = i.myNodeNum));
    device.events.onDeviceMetadataPacket.subscribe((m) => {
      state.metadata = m.data;
      render();
    });
    device.events.onConfigPacket.subscribe((c) => {
      if (c.payloadVariant.case) state.config[c.payloadVariant.case] = c.payloadVariant.value;
      renderSoon();
    });
    device.events.onModuleConfigPacket.subscribe((c) => {
      if (c.payloadVariant.case) state.moduleConfig[c.payloadVariant.case] = c.payloadVariant.value;
      renderSoon();
    });
    device.events.onChannelPacket.subscribe((ch) => {
      state.channels[ch.index] = ch;
      renderSoon();
    });
    device.events.onNodeInfoPacket.subscribe((n) => {
      state.nodes.set(n.num, n);
      renderSoon();
    });
    device.events.onMeshPacket.subscribe(onKiraPacket);
    device.events.onWaypointPacket.subscribe((w) => {
      state.waypoints.set(w.data.id, { ...w.data, from: w.from });
      renderSoon();
    });

    await device.configure();
    setStatus("verbunden");
  } catch (e) {
    console.error(e);
    if (state.device) await closeConnection(state.device, state.transport);
    resetConnection("Fehler: " + fehlerText(e));
  }
}

// Schließt die Verbindung Schritt für Schritt; ein Fehler in einem Schritt hält die anderen nicht auf.
async function closeConnection(device, transport) {
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

function resetConnection(status) {
  state.device = null;
  state.transport = null;
  state.dirty = false;
  state.kira = null;
  state.kiraStats = null;
  state.wifiNets = null;
  state.wifiScanning = false;
  state.ui = null;
  state.menuText = state.menuBuf = null;
  setStatus(status);
}

async function disconnect() {
  if (!state.device) return;
  if (state.dirty && !confirm("Es gibt ungespeicherte Änderungen. Trotzdem trennen und verwerfen?")) return;
  state.closing = true;
  setStatus("trenne …");
  await closeConnection(state.device, state.transport);
  state.closing = false;
  resetConnection("getrennt – das Gerät kann jetzt abgezogen werden");
}

// Seite wird verlassen: Port/Bluetooth freigeben, damit Loader oder andere Tabs das Gerät wieder öffnen können
window.addEventListener("beforeunload", (e) => {
  if (state.device && state.dirty) e.preventDefault();
});
window.addEventListener("pagehide", () => {
  if (state.device) closeConnection(state.device, state.transport);
});

function setStatus(s) {
  state.status = s;
  render();
}

let renderTimer;
function renderSoon() {
  clearTimeout(renderTimer);
  renderTimer = setTimeout(render, 150);
}

// ---------- Speichern ----------

async function withEdit(fn) {
  const d = state.device;
  if (!d) return toast("Bitte zuerst das Gerät verbinden.", true);
  // Rückmeldung direkt am Knopf und als Meldung unten rechts (auch wenn die Seite weit gescrollt ist)
  const b = document.activeElement?.tagName === "BUTTON" ? document.activeElement : null;
  const label = b?.innerHTML;
  if (b) {
    b.disabled = true;
    b.replaceChildren(el("span", { class: "spinner-border spinner-border-sm me-1", "aria-hidden": "true" }), "Speichere …");
  }
  toast("Speichere …");
  try {
    // Nicht auf die Bestätigungen (ACK) warten: die kommen vom Gerät nicht immer, dann hinge das Speichern ewig.
    // Die Befehle werden in Reihenfolge in die Sendewarteschlange gelegt; fertig, wenn alle zum Gerät geschrieben sind.
    const quiet = (pr) => pr?.catch?.((e) => console.warn("Speichern:", e));
    quiet(d.beginEditSettings?.());
    quiet(fn(d));
    quiet(d.commitEditSettings());
    const t0 = Date.now();
    while (d.queue?.queue?.some((q) => !q.sent)) {
      if (Date.now() - t0 > 15000) throw deFehler("Das Gerät nimmt keine Daten an.");
      await new Promise((r) => setTimeout(r, 100));
    }
    toast("Gespeichert und ans Gerät übertragen. Es übernimmt die Einstellungen (startet ggf. neu).");
    state.dirty = false;
    if (b) {
      b.replaceChildren(icon("fa-check"), "Gespeichert");
      b.classList.add("btn-success");
    }
  } catch (e) {
    console.error(e);
    toast("Fehler beim Speichern: " + fehlerText(e), true);
    if (b) b.replaceChildren(icon("fa-exclamation-triangle"), "Fehler");
  } finally {
    if (b)
      setTimeout(() => {
        b.disabled = false;
        b.classList.remove("btn-success");
        b.innerHTML = label;
      }, 3000);
  }
}

const saveConfig = (section) =>
  withEdit((d) => d.setConfig(create(P.Config.ConfigSchema, { payloadVariant: { case: section, value: state.config[section] } })));
const saveModule = (section) =>
  withEdit((d) =>
    d.setModuleConfig(create(P.ModuleConfig.ModuleConfigSchema, { payloadVariant: { case: section, value: state.moduleConfig[section] } })),
  );

// ---------- Backup ----------

function backupObject() {
  const out = { thinkkira: 1, created: new Date().toISOString(), config: {}, moduleConfig: {}, channels: [], owner: null };
  for (const [k, v] of Object.entries(state.config))
    out.config[k] = toJson(P.Config.ConfigSchema, create(P.Config.ConfigSchema, { payloadVariant: { case: k, value: v } }));
  for (const [k, v] of Object.entries(state.moduleConfig))
    out.moduleConfig[k] = toJson(P.ModuleConfig.ModuleConfigSchema, create(P.ModuleConfig.ModuleConfigSchema, { payloadVariant: { case: k, value: v } }));
  for (const ch of state.channels) if (ch) out.channels.push(toJson(P.Channel.ChannelSchema, ch));
  const me = state.nodes.get(state.myNodeNum);
  if (me?.user) out.owner = toJson(P.Mesh.UserSchema, me.user);
  return out;
}

function downloadBackup() {
  const blob = new Blob([JSON.stringify(backupObject(), null, 2)], { type: "application/json" });
  const a = el("a", { href: URL.createObjectURL(blob), download: `thinkkira-backup-${new Date().toISOString().slice(0, 10)}.json` });
  a.click();
}

async function restoreBackup(file) {
  const data = JSON.parse(await file.text());
  if (!data.config) return toast("Keine gültige Sicherung", true);
  await withEdit((d) => {
    // ohne await: Reihenfolge bleibt über die Sendewarteschlange erhalten (siehe withEdit)
    const all = [];
    for (const j of Object.values(data.config)) all.push(d.setConfig(fromJson(P.Config.ConfigSchema, j)));
    for (const j of Object.values(data.moduleConfig ?? {})) all.push(d.setModuleConfig(fromJson(P.ModuleConfig.ModuleConfigSchema, j)));
    for (const j of data.channels ?? []) all.push(d.setChannel(fromJson(P.Channel.ChannelSchema, j)));
    if (data.owner) all.push(d.setOwner(fromJson(P.Mesh.UserSchema, data.owner)));
    return Promise.all(all);
  });
}

// ---------- Wegpunkte / GPX ----------

function parseGpx(text) {
  const doc = new DOMParser().parseFromString(text, "application/xml");
  return [...doc.querySelectorAll("wpt")].map((w) => ({
    lat: parseFloat(w.getAttribute("lat")),
    lon: parseFloat(w.getAttribute("lon")),
    name: w.querySelector("name")?.textContent ?? "WP",
    description: w.querySelector("desc")?.textContent ?? "",
  }));
}

function toGpx(list) {
  const esc = (s) => String(s).replace(/[<>&"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;" })[c]);
  const wpts = list
    .map((w) => `  <wpt lat="${(w.latitudeI * 1e-7).toFixed(7)}" lon="${(w.longitudeI * 1e-7).toFixed(7)}"><name>${esc(w.name)}</name><desc>${esc(w.description ?? "")}</desc></wpt>`)
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<gpx version="1.1" creator="ThinkKira" xmlns="http://www.topografix.com/GPX/1/1">\n${wpts}\n</gpx>\n`;
}

// ---------- Offline-Karte ----------
const FALLBACK_MAPS = [{ name: "potsdam-ludwigsfelde", title: "Potsdam – Ludwigsfelde", kind: "region", bbox: [52.26, 12.95, 52.45, 13.32] }];

// Verzeichnis der Karten (Release „karten“) einmal laden
function loadMapList() {
  if (state.mapList !== undefined) return;
  state.mapList = null;
  fetch(firmwareUrl() + "?maps=1")
    .then((r) => (r.ok ? r.json() : Promise.reject()))
    .then((j) => {
      state.mapList = Array.isArray(j.maps) && j.maps.length ? j.maps : null;
      renderSoon();
    })
    .catch(() => {});
}

// Kleinste Karte, die die eigene Position enthält (Detailregion vor Raster)
function mapForPosition(list) {
  const p = state.nodes.get(state.myNodeNum)?.position;
  if (!p?.latitudeI) return null;
  const lat = p.latitudeI * 1e-7,
    lon = p.longitudeI * 1e-7;
  const hits = list.filter((m) => lat >= m.bbox[0] && lat <= m.bbox[2] && lon >= m.bbox[1] && lon <= m.bbox[3]);
  hits.sort((a, b) => (a.kind !== "region") - (b.kind !== "region") || (a.bbox[2] - a.bbox[0]) * (a.bbox[3] - a.bbox[1]) - (b.bbox[2] - b.bbox[0]) * (b.bbox[3] - b.bbox[1]));
  return hits[0] ?? null;
}

function mapPicker() {
  loadMapList();
  const list = state.mapList || FALLBACK_MAPS;
  const here = mapForPosition(list);
  if (!state.mapPick || !list.some((m) => m.name === state.mapPick)) state.mapPick = (here ?? list[0]).name;
  const sel = el("select", { class: "form-select form-select-sm mb-2", "aria-label": "Karte", onchange: (e) => (state.mapPick = e.target.value) });
  const kb = (m) => (m.bytes ? " (" + Math.round(m.bytes / 1024) + " KB)" : "");
  const groups = [
    ["Detailkarten (Städte und Wandergebiete)", list.filter((m) => m.kind === "region")],
    ["Ganz Deutschland, grob (ca. 50 × 50 km)", list.filter((m) => m.kind !== "region")],
  ];
  for (const [label, ms] of groups) {
    if (!ms.length) continue;
    const g = el("optgroup", { label });
    for (const m of ms) g.append(el("option", { value: m.name }, (here && m.name === here.name ? "📍 " : "") + m.title + kb(m)));
    sel.append(g);
  }
  sel.value = state.mapPick;
  return el(
    "div",
    {},
    sel,
    here ? el("div", { class: "small text-muted mb-2" }, "📍 = passt zur aktuellen Position des Geräts") : null,
  );
}
let mapWait = null;
function waitDevice(ms, text) {
  return new Promise((resolve, reject) => {
    mapWait = { resolve, reject };
    setTimeout(() => reject(new Error(text)), ms);
  }).finally(() => (mapWait = null));
}

// Schnelles Senden vieler Port-287-Befehle direkt in den Datenstrom: die Meshtastic-Warteschlange
// wartet 200 ms je Paket, das wäre für eine Karte (tausende Stücke) zu langsam.
async function fastSend(cmds) {
  const dev = state.device;
  const q = dev.queue;
  // Die Warteschlange der Meshtastic-Bibliothek sperren, solange wir selbst schreiben. Sonst holt sie sich
  // gleichzeitig den Schreibzugriff, bekommt einen Fehler und bleibt für immer gesperrt (dann geht gar nichts mehr).
  const t0 = Date.now();
  while (q?.lock && Date.now() - t0 < 15000) await new Promise((r) => setTimeout(r, 20));
  if (q) q.lock = true; // nach 15 s gilt eine hängende Sperre als verwaist
  let writer;
  try {
    writer = dev.transport.toDevice.getWriter();
    for (const cmd of cmds) {
      const packet = create(P.Mesh.MeshPacketSchema, {
        payloadVariant: { case: "decoded", value: { payload: new TextEncoder().encode(cmd), portnum: KIRA_PORT } },
        from: state.myNodeNum,
        to: state.myNodeNum,
        id: Math.floor(Math.random() * 0x7fffffff) + 1,
        wantAck: false,
      });
      await writer.write(toBinary(P.Mesh.ToRadioSchema, create(P.Mesh.ToRadioSchema, { payloadVariant: { case: "packet", value: packet } })));
    }
  } finally {
    writer?.releaseLock();
    if (q) {
      q.lock = false;
      // was in der Zwischenzeit angefallen ist (z. B. Herzschlag der Bibliothek), jetzt senden
      if (q.queue?.some((x) => !x.sent)) q.processQueue(dev.transport.toDevice).catch((e) => console.warn(e));
    }
  }
}

const firmwareUrl = () => root?.dataset.firmware || "/_scripts/php/keylink/thinkkira/firmware.php";

async function uploadMap(bytes, label) {
  if (!state.device) return toast("Bitte zuerst das Gerät verbinden.", true);
  if (bytes.length < 40 || new TextDecoder().decode(bytes.subarray(0, 4)) !== "TKM1") return toast("Das ist keine ThinkKira-Kartendatei (.tkm).", true);
  const v = (state.kira?.version ?? "0").split(".").map(Number);
  if (v[0] === 0 && (v[1] < 4 || (v[1] === 4 && (v[2] || 0) < 1)))
    return toast("Auf dem Gerät läuft ThinkKira " + (state.kira?.version ?? "?") + ". Für Karten bitte zuerst im Loader die neueste Version installieren.", true);
  state.mapUp = { total: bytes.length, sent: 0, label, cancel: false };
  render();
  try {
    // Start ankündigen; das Gerät legt die Datei an (kann bei voller Karte etwas dauern) – bis zu 3 Versuche
    for (let i = 0; ; i++) {
      const ready = waitDevice(10000, "Das Gerät antwortet nicht auf den Kartenstart. Bitte Gerät neu starten und erneut verbinden.");
      kiraSend("mapb|" + bytes.length);
      try {
        await ready;
        break;
      } catch (e) {
        if (i >= 2 || state.mapUp.cancel) throw e;
      }
    }
    // 162 Byte → 216 Zeichen Base64; mit „mapd|offset|“ höchstens 228 Byte (Meshtastic erlaubt 233 je Paket)
    const CH = 162;
    // Stop-and-Wait: ein Stück senden, Gerät quittiert mit seinem Stand (k|a|bytes), dort weitermachen.
    // Mehrere Stücke auf einmal würden den kleinen USB-Empfangspuffer des Geräts überlaufen lassen.
    let pos = 0,
      fails = 0;
    while (pos < bytes.length) {
      if (state.mapUp.cancel) throw deFehler("Abgebrochen.");
      let bin = "";
      for (const c of bytes.subarray(pos, pos + CH)) bin += String.fromCharCode(c);
      const ack = waitDevice(4000, "keine Quittung");
      // nach einer Zeitüberschreitung zusätzlich den Stand abfragen (mapq), falls nur die Quittung verloren ging
      await fastSend(fails ? ["mapd|" + pos + "|" + btoa(bin), "mapq"] : ["mapd|" + pos + "|" + btoa(bin)]);
      let got;
      try {
        got = await ack;
      } catch (e) {
        console.warn("Karte: keine Quittung bei Byte", pos, "Versuch", fails + 1);
        if (e.message !== "keine Quittung") throw e; // z. B. Fehlermeldung des Geräts
        if (++fails > 15)
          throw deFehler(
            "Das Gerät quittiert seit einer Minute nicht mehr (bei " + Math.round(pos / 1024) + " von " + Math.round(bytes.length / 1024) + " KB). Bitte Gerät neu starten, Seite neu laden und erneut versuchen.",
          );
        continue; // Stück erneut senden; das Gerät quittiert auch Wiederholungen
      }
      if (typeof got !== "number") continue;
      if (got > pos) fails = 0;
      else if (++fails > 20) throw deFehler("Zu viele Übertragungsfehler. Bitte erneut versuchen (USB-Kabel prüfen).");
      pos = got;
      if (pos - state.mapUp.sent >= 4096 || pos >= bytes.length) {
        state.mapUp.sent = pos;
        render();
      }
    }
    const done = waitDevice(20000, "Das Gerät hat das Ende nicht bestätigt.");
    kiraSend("mape");
    await done;
    toast("Karte „" + label + "“ übertragen (" + Math.round(bytes.length / 1024) + " KB).");
  } catch (e) {
    toast("Karte: " + fehlerText(e), true);
  } finally {
    state.mapUp = null;
    render();
  }
}

function trackGpx(pts) {
  const seg = pts
    .map(([la, lo, t]) => `    <trkpt lat="${(la * 1e-7).toFixed(7)}" lon="${(lo * 1e-7).toFixed(7)}">${t ? `<time>${new Date(t * 1000).toISOString()}</time>` : ""}</trkpt>`)
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<gpx version="1.1" creator="ThinkKira" xmlns="http://www.topografix.com/GPX/1/1">\n<trk><name>ThinkKira Track</name><trkseg>\n${seg}\n</trkseg></trk>\n</gpx>\n`;
}

const wpName = (n) => String(n).replace(/[|\n\r]/g, " ").trim().slice(0, 19) || "WP";

async function sendWaypoint(w) {
  const wp = create(P.Mesh.WaypointSchema, {
    id: Math.floor(Math.random() * 0x7fffffff),
    name: w.name.slice(0, 29),
    description: (w.description ?? "").slice(0, 99),
    latitudeI: Math.round(w.lat * 1e7),
    longitudeI: Math.round(w.lon * 1e7),
    expire: 0,
    lockedTo: 0,
  });
  await state.device.sendWaypoint(wp, "broadcast", 0);
  state.waypoints.set(wp.id, { ...wp, from: state.myNodeNum });
}

// ---------- ThinkKira-Befehle (Port 287) ----------

const KIRA_PORT = 287;
let scanTimer;

function onKiraPacket(p) {
  const d = p?.payloadVariant?.case === "decoded" ? p.payloadVariant.value : null;
  if (!d || d.portnum !== KIRA_PORT) return;
  const text = new TextDecoder().decode(d.payload);
  const [kind, a, b, ...rest] = text.split("|");
  if (kind === "m") {
    state.kira = { mode: a, version: b };
    renderSoon();
    return;
  }
  if (kind === "k") {
    if (a === "info") state.mapInfo = { size: +b, level: +rest[0], bbox: rest.slice(1, 5).map((x) => +x * 1e-7) };
    else if (a === "none") state.mapInfo = false;
    else if (a === "ready") mapWait?.resolve("ready");
    else if (a === "ok") {
      mapWait?.resolve("ok");
      kiraSend("mapi");
    } else if (a === "a") mapWait?.resolve(+b);
    renderSoon();
    return;
  }
  if (kind === "p") {
    if (a === "end") {
      state.devWps = state.wpBuf ?? [];
      state.wpBuf = null;
      state.arrive = +rest[0] || 20;
      state.navTarget = rest[1] ?? "";
      renderSoon();
    } else (state.wpBuf ??= []).push({ idx: +a, name: b, lat: +rest[0] * 1e-7, lon: +rest[1] * 1e-7, time: +rest[2] });
    return;
  }
  if (kind === "t") {
    const chunk = text.slice(2);
    if (chunk === "cleared") {
      toast("Track im Gerät gelöscht.");
      return;
    }
    if (chunk.startsWith("end|")) {
      const pts = (state.trackBuf ?? "")
        .split("\n")
        .filter(Boolean)
        .map((l) => l.split(",").map(Number));
      state.trackBuf = null;
      if (!pts.length) return toast("Der Track im Gerät ist leer.", true);
      const blob = new Blob([trackGpx(pts)], { type: "application/gpx+xml" });
      el("a", { href: URL.createObjectURL(blob), download: "thinkkira-track.gpx" }).click();
      toast(pts.length + " Track-Punkte heruntergeladen.");
      return;
    }
    state.trackBuf = (state.trackBuf ?? "") + chunk;
    return;
  }
  if (kind === "M") {
    const chunk = text.slice(2);
    if (chunk === "end") {
      state.menuText = state.menuBuf ?? "";
      state.menuBuf = "";
      renderSoon();
    } else if (chunk === "ok") {
      toast("Design übertragen. Das Gerät zeigt die neue Oberfläche sofort.");
      kiraSend("ui");
      kiraSend("mg");
    } else state.menuBuf = (state.menuBuf ?? "") + chunk;
    return;
  }
  if (kind === "u") {
    state.ui = parseUi([a, b, ...rest]);
    renderSoon();
    return;
  }
  if (kind === "s" && a !== "end") {
    const n = [a, b, ...rest].map((x) => parseInt(x, 10));
    state.kiraPending = { counters: { rxGood: n[0], rxBad: n[1], tx: n[2], relay: n[3], pings: n[4], pongs: n[5] }, heard: [], range: [] };
    return;
  }
  if (kind === "h" && state.kiraPending) {
    state.kiraPending.heard.push({ from: a, rssi: +b, snr: +rest[0], ago: +rest[1] });
    return;
  }
  if (kind === "r") {
    const r = { seq: +a, from: b, rssiThem: +rest[0], snrThem: +rest[1], rssiUs: +rest[2], snrUs: +rest[3], ago: +rest[4] };
    if (state.kiraPending) state.kiraPending.range.push(r);
    else {
      // Live-Antwort auf einen Ping aus dem Konfigurator
      state.kiraStats ??= { counters: null, heard: [], range: [] };
      state.kiraStats.range.unshift(r);
      render();
      toast("Antwort von " + nodeName(b) + ": " + r.rssiUs + " dBm");
    }
    return;
  }
  if (kind === "s" && a === "end") {
    state.kiraStats = state.kiraPending;
    state.kiraPending = null;
    render();
    return;
  }
  if (kind === "err") {
    if (a.startsWith("Karte")) mapWait?.reject(new Error(a));
    toast("Gerät meldet: " + a, true);
    return;
  }
  if (kind !== "w") return;
  if (a === "end") {
    clearTimeout(scanTimer);
    state.wifiScanning = false;
    state.wifiNets.sort((x, y) => y.rssi - x.rssi);
    render();
    if (b === "-1") toast("Diese Firmware kann keine WLAN-Suche.", true);
    else toast(state.wifiNets.length ? state.wifiNets.length + " WLAN-Netze gefunden. Bitte unten auswählen." : "Keine WLAN-Netze gefunden.");
    return;
  }
  const ssid = rest.join("|");
  if (state.wifiNets && !state.wifiNets.some((n) => n.ssid === ssid)) state.wifiNets.push({ ssid, rssi: parseInt(a, 10), open: b === "1" });
}

async function kiraSend(cmd) {
  if (!state.device) return false;
  try {
    await state.device.sendPacket(new TextEncoder().encode(cmd), KIRA_PORT, "self", 0, false, false);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}

function nodeName(hex) {
  const n = state.nodes.get(parseInt(hex, 16));
  return n?.user?.shortName || n?.user?.longName || "!" + hex;
}

async function wifiScan() {
  if (!state.device || state.wifiScanning) return;
  state.wifiScanning = true;
  state.wifiNets = [];
  render();
  try {
    await state.device.sendPacket(new TextEncoder().encode("wifiscan"), KIRA_PORT, "self", 0, false, false);
  } catch (e) {
    console.error(e);
  }
  clearTimeout(scanTimer);
  scanTimer = setTimeout(() => {
    if (!state.wifiScanning) return;
    state.wifiScanning = false;
    render();
    toast("Das Gerät antwortet nicht auf die WLAN-Suche. Bitte zuerst die neueste ThinkKira-Firmware über den Loader aufspielen.", true);
  }, 12000);
}

// Auswahlfeld für den WLAN-Namen: gefundene Netze + „Anderes Netz (manuell)“
function ssidPicker(get, set) {
  const id = "tk-ssid";
  const manualVal = "__manuell__";
  const current = get() ?? "";
  const nets = state.wifiNets ?? [];
  const sel = el("select", { id, class: "form-select form-select-sm" });
  sel.append(el("option", { value: "" }, nets.length ? "– Netz auswählen –" : "– erst „Netze suchen“ klicken –"));
  for (const n of nets) {
    const bars = n.rssi >= -60 ? "sehr gut" : n.rssi >= -70 ? "gut" : n.rssi >= -80 ? "mäßig" : "schwach";
    sel.append(el("option", { value: n.ssid }, n.ssid + " (" + bars + ", " + n.rssi + " dBm" + (n.open ? ", offen" : "") + ")"));
  }
  if (current && !nets.some((n) => n.ssid === current)) sel.append(el("option", { value: current }, current + " (gespeichert)"));
  sel.append(el("option", { value: manualVal }, "Anderes Netz (manuell eingeben) …"));
  sel.value = current;

  const manual = el("input", { type: "text", class: "form-control form-control-sm mt-2 d-none", placeholder: "WLAN-Name eingeben", maxlength: "32" });
  manual.addEventListener("input", () => set(manual.value));
  sel.addEventListener("change", () => {
    const isManual = sel.value === manualVal;
    manual.classList.toggle("d-none", !isManual);
    if (isManual) {
      manual.value = "";
      manual.focus();
    } else set(sel.value);
  });

  const scanBtn = el(
    "button",
    { type: "button", class: "btn btn-sm btn-outline-secondary", onclick: wifiScan },
    state.wifiScanning ? el("span", { class: "spinner-border spinner-border-sm me-1" }) : icon("fa-search"),
    state.wifiScanning ? "Suche …" : "Netze suchen",
  );
  if (state.wifiScanning || !state.device) scanBtn.disabled = true;
  const box = el("div", {}, el("div", { class: "input-group input-group-sm" }, sel, scanBtn), manual);
  return { input: box, id };
}

// ---------- Seiten ----------

const icon = (name) => el("i", { class: "fas " + name + " me-1" });
const btn = (text, onclick, kind = "primary", ic) =>
  el("button", { type: "button", class: "btn btn-sm btn-" + kind + " me-2 mt-2", onclick }, ic ? icon(ic) : null, text);
const grid = (...cols) => el("div", { class: "row g-3 mb-3" }, ...cols.filter(Boolean).map((c) => el("div", { class: "col-lg-6" }, c)));
const hint = (t) => el("div", { class: "form-text mb-2" }, t);

const PAGES = [
  { id: "device", title: "Gerät", ic: "fa-microchip" },
  { id: "channels", title: "Kanäle", ic: "fa-comments" },
  { id: "cfg:lora", title: "Funk", ic: "fa-broadcast-tower" },
  { id: "cfg:position", title: "GPS", ic: "fa-map-marker-alt" },
  { id: "cfg:power", title: "Energie", ic: "fa-battery-three-quarters" },
  { id: "cfg:network", title: "WLAN", ic: "fa-wifi" },
  { id: "cfg:bluetooth", title: "Bluetooth", ic: "fa-mobile-alt" },
  { id: "cfg:display", title: "Anzeige", ic: "fa-tv" },
  { id: "cfg:security", title: "Sicherheit", ic: "fa-lock" },
  { id: "modules", title: "Module", ic: "fa-puzzle-piece" },
  { id: "waypoints", title: "Wegpunkte", ic: "fa-flag" },
  { id: "canned", title: "Schnellantworten", ic: "fa-reply" },
  { id: "thinkkira", title: "ThinkKira", ic: "fa-star" },
  { id: "system", title: "System", ic: "fa-cog" },
];

function infoRow() {
  const md = state.metadata;
  const me = state.nodes.get(state.myNodeNum);
  const item = (label, value) =>
    el("div", { class: "col-6 col-md-3" }, el("div", { class: "small text-muted" }, label), el("div", { class: "fw-bold" }, value));
  return el(
    "div",
    { class: "row g-2 mb-3" },
    item("Name", me?.user?.longName ?? "–"),
    item("Knoten-Nr.", state.myNodeNum ? "!" + state.myNodeNum.toString(16).padStart(8, "0") : "–"),
    item("Firmware", md?.firmwareVersion ?? "–"),
    item("Knoten bekannt", String(state.nodes.size)),
  );
}

function pageDevice() {
  const me = state.nodes.get(state.myNodeNum);
  let nameBox = null;
  if (me?.user) {
    const user = clone(P.Mesh.UserSchema, me.user);
    nameBox = group(
      "Name",
      renderMessage(P.Mesh.UserSchema, user, { skip: ["id", "macaddr", "hwModel", "publicKey", "role"] }),
      btn("Name speichern", () => withEdit((d) => d.setOwner(user)), "primary", "fa-save"),
    );
  }
  const devBox = state.config.device
    ? group("Geräte-Einstellungen", renderMessage(P.Config.Config_DeviceConfigSchema, state.config.device), btn("Speichern", () => saveConfig("device"), "primary", "fa-save"))
    : null;
  return grid(nameBox, devBox);
}

function pageConfig(section) {
  const msg = state.config[section];
  if (!msg) return el("div", { class: "alert alert-warning" }, "Noch nicht vom Gerät geladen.");
  const schema = P.Config.ConfigSchema.fields.find((f) => f.localName === section).message;
  return grid(
    group(
      SECTION_LABELS[section] ?? section,
      section === "lora" ? hint("Für Deutschland: Region EU_868. Der eigene ThinkKira-Funkmodus kommt mit Firmware-Phase 2.") : null,
      section === "network" ? hint("„Netze suchen“ lässt das Gerät die WLAN-Netze in der Nähe suchen (dauert ein paar Sekunden).") : null,
      renderMessage(schema, msg, section === "network" ? { custom: { wifiSsid: ssidPicker } } : {}),
      btn("Speichern", () => saveConfig(section), "primary", "fa-save"),
    ),
  );
}

function pageChannels() {
  const boxes = [];
  for (let i = 0; i < 8; i++) {
    const ch = state.channels[i];
    if (!ch) continue;
    boxes.push(
      group(
        `Kanal ${i}${i === 0 ? " (primär)" : ""}`,
        renderMessage(P.Channel.ChannelSchema, ch, { skip: ["index"] }),
        btn(`Kanal ${i} speichern`, () => withEdit((d) => d.setChannel(ch)), "primary", "fa-save"),
      ),
    );
  }
  return grid(...boxes);
}

function pageModules() {
  const boxes = [];
  for (const f of P.ModuleConfig.ModuleConfigSchema.fields) {
    const msg = state.moduleConfig[f.localName];
    if (!msg) continue;
    boxes.push(group(SECTION_LABELS[f.localName] ?? f.localName, renderMessage(f.message, msg), btn("Speichern", () => saveModule(f.localName), "primary", "fa-save")));
  }
  return grid(...boxes);
}

function pageWaypoints() {
  const kiraOk = !!state.kira;
  if (kiraOk && !state.devWps && !state.wpAsked) {
    state.wpAsked = true;
    setTimeout(() => kiraSend("wpl"), 0);
  }
  const name = el("input", { type: "text", class: "form-control form-control-sm", placeholder: "Name", maxlength: "19" });
  const lat = el("input", { type: "number", class: "form-control form-control-sm", step: "any", placeholder: "Breite, z. B. 52.3906" });
  const lon = el("input", { type: "number", class: "form-control form-control-sm", step: "any", placeholder: "Länge, z. B. 13.0645" });
  const toMesh = el("input", { type: "checkbox", class: "form-check-input", id: "tk-wp-mesh" });
  const read = () => {
    if (!name.value || !lat.value || !lon.value) {
      toast("Name, Breite und Länge ausfüllen", true);
      return null;
    }
    return { name: wpName(name.value), lat: parseFloat(lat.value), lon: parseFloat(lon.value) };
  };

  // Wegpunkte im Gerät
  const list = state.devWps ?? [];
  const rows = list.map((w) => {
    const inp = el("input", { type: "text", class: "form-control form-control-sm", value: w.name, maxlength: "19", "aria-label": "Name" });
    inp.addEventListener("change", () => kiraSend("wpr|" + w.idx + "|" + wpName(inp.value)));
    const act = (ic, title, cmd) => el("button", { type: "button", class: "btn btn-sm btn-outline-secondary", title, "aria-label": title, onclick: () => kiraSend(cmd) }, el("i", { class: "fas " + ic }));
    return [
      inp,
      `${w.lat.toFixed(5)}, ${w.lon.toFixed(5)}`,
      el(
        "div",
        { class: "btn-group btn-group-sm" },
        act("fa-location-arrow", "Als Ziel", "wpg|" + w.idx),
        act("fa-paper-plane", "Ins Mesh senden", "wps|" + w.idx),
        el(
          "button",
          {
            type: "button",
            class: "btn btn-sm btn-outline-danger",
            title: "Löschen",
            "aria-label": "Löschen",
            onclick: () => confirm("Wegpunkt „" + w.name + "“ löschen?") && kiraSend("wpd|" + w.idx),
          },
          el("i", { class: "fas fa-trash" }),
        ),
      ),
    ];
  });
  const gpxIn = el("input", { type: "file", class: "form-control form-control-sm", accept: ".gpx,application/gpx+xml" });
  gpxIn.addEventListener("change", async () => {
    const wl = parseGpx(await gpxIn.files[0].text());
    const room = 64 - list.length;
    for (const w of wl.slice(0, room)) kiraSend(`wpa|${wpName(w.name)}|${Math.round(w.lat * 1e7)}|${Math.round(w.lon * 1e7)}`);
    toast(wl.length > room ? `${room} von ${wl.length} Wegpunkten übernommen (Gerät hat Platz für 64).` : `${wl.length} Wegpunkte ins Gerät übernommen.`);
  });
  const arrive = el("input", { type: "number", class: "form-control form-control-sm", min: "5", max: "500", value: String(state.arrive ?? 20), id: "tk-arrive" });

  const deviceBox = kiraOk
    ? group(
        "Wegpunkte im Gerät (" + list.length + " von 64)",
        state.navTarget ? el("div", { class: "alert alert-info py-1 px-2 small" }, "Aktuelles Ziel: " + state.navTarget) : null,
        list.length ? table(["Name", "Position", ""], rows) : el("p", { class: "text-muted small" }, state.devWps ? "Noch keine Wegpunkte im Gerät." : "Lese Wegpunkte …"),
        el("div", { class: "mb-2" }, el("label", { class: "form-label small mb-1" }, "GPX-Datei ins Gerät übernehmen"), gpxIn),
        btn(
          "Als GPX exportieren",
          () => {
            const blob = new Blob([toGpx(list.map((w) => ({ name: w.name, latitudeI: w.lat * 1e7, longitudeI: w.lon * 1e7 })))], { type: "application/gpx+xml" });
            el("a", { href: URL.createObjectURL(blob), download: "thinkkira-wegpunkte.gpx" }).click();
          },
          "outline-secondary",
          "fa-file-export",
        ),
        btn("Neu laden", () => kiraSend("wpl"), "outline-secondary", "fa-sync"),
      )
    : group("Wegpunkte im Gerät", el("div", { class: "alert alert-warning mb-0" }, "Braucht ThinkKira 0.4.0 oder neuer – bitte über den Loader aktualisieren."));

  const addBox = group(
    "Wegpunkt anlegen",
    el("div", { class: "mb-2" }, el("label", { class: "form-label small mb-1" }, "Name"), name),
    el("div", { class: "row g-2 mb-2" }, el("div", { class: "col-6" }, lat), el("div", { class: "col-6" }, lon)),
    el("div", { class: "form-check mb-1" }, toMesh, el("label", { class: "form-check-label small", for: "tk-wp-mesh" }, "Auch als Meshtastic-Wegpunkt an alle senden")),
    kiraOk
      ? btn(
          "Im Gerät speichern",
          async () => {
            const w = read();
            if (!w) return;
            kiraSend(`wpa|${w.name}|${Math.round(w.lat * 1e7)}|${Math.round(w.lon * 1e7)}`);
            if (toMesh.checked) await sendWaypoint(w);
            toast("Wegpunkt gespeichert" + (toMesh.checked ? " und gesendet" : ""));
          },
          "primary",
          "fa-save",
        )
      : null,
    btn(
      "Nur an alle senden",
      async () => {
        const w = read();
        if (!w) return;
        await sendWaypoint(w);
        toast("Wegpunkt gesendet");
        render();
      },
      "outline-secondary",
      "fa-paper-plane",
    ),
  );

  const navBox = kiraOk
    ? group(
        "Navigation & Track",
        el("label", { class: "form-label small mb-1", for: "tk-arrive" }, "Ankunftsradius (Meter)"),
        el("div", { class: "input-group input-group-sm mb-2" }, arrive, el("button", { type: "button", class: "btn btn-outline-secondary", onclick: () => kiraSend("arrive|" + Math.round(+arrive.value || 20)) }, "Speichern")),
        hint("Innerhalb dieses Abstands meldet das Gerät „Ziel erreicht“ (Ton + LED) und beendet die Navigation."),
        btn("Track herunterladen (GPX)", () => {
          state.trackBuf = "";
          kiraSend("trk");
          toast("Track wird gelesen …");
        }, "outline-secondary", "fa-route"),
        btn("Track im Gerät löschen", () => confirm("Den aufgezeichneten Track im Gerät löschen?") && kiraSend("trc"), "outline-danger", "fa-trash"),
      )
    : null;

  return el("div", {}, grid(deviceBox, addBox), grid(navBox));
}

function pageCanned() {
  const ta = el("textarea", { rows: "6", class: "form-control form-control-sm", placeholder: "Eine Nachricht pro Zeile, z. B.\nOK\nBin unterwegs\nBrauche Hilfe" });
  return grid(
    group(
      "Schnellantworten",
      hint("Erscheinen auf dem Gerät unter Nachrichten → Antworten. Eine Nachricht pro Zeile."),
      ta,
      btn(
        "Speichern",
        () =>
          withEdit((d) =>
            d.setCannedMessages(
              create(P.CannedMessages.CannedMessageModuleConfigSchema, {
                messages: ta.value.split("\n").map((s) => s.trim()).filter(Boolean).join("|"),
              }),
            ),
          ),
        "primary",
        "fa-save",
      ),
    ),
  );
}

function pageThinkKira() {
  const k = state.kira;
  // Funkmodus
  let modeBox;
  if (!k) {
    modeBox = group(
      "Funkmodus",
      el("div", { class: "alert alert-warning mb-0" }, "Keine Antwort vom ThinkKira-Modul. Bitte die neueste ThinkKira-Firmware über den Loader aufspielen."),
    );
  } else {
    const sel = el("select", { id: "tk-mode", class: "form-select form-select-sm" });
    sel.append(el("option", { value: "meshtastic" }, "Meshtastic (Standard, kompatibel mit allen Meshtastic-Geräten)"));
    sel.append(el("option", { value: "kira" }, "Kira-Funk (eigenes Netz, nur ThinkKira-Geräte)"));
    sel.value = k.mode;
    modeBox = group(
      "Funkmodus",
      el("div", { class: "mb-2" }, el("label", { class: "form-label small mb-1", for: "tk-mode" }, "Modus"), sel),
      hint(
        "Kira-Funk nutzt ein eigenes Sync-Word: Die Geräte hören nur noch andere ThinkKira-Geräte im Kira-Funk, nicht mehr das Meshtastic-Netz. Kanäle und Verschlüsselung bleiben gleich. Beim Wechsel startet das Gerät neu.",
      ),
      btn(
        "Modus speichern",
        async () => {
          if (sel.value === k.mode) return toast("Der Modus ist schon eingestellt.");
          if (await kiraSend("mode|" + sel.value)) toast("Gespeichert. Das Gerät startet neu – danach bitte neu verbinden.");
        },
        "primary",
        "fa-save",
      ),
      el("div", { class: "small text-muted mt-2" }, "ThinkKira " + k.version),
    );
  }

  // Statistik
  const st = state.kiraStats;
  const statKids = [];
  if (st?.counters) {
    const c = st.counters;
    const item = (label, v) => el("div", { class: "col-6 col-md-4" }, el("div", { class: "small text-muted" }, label), el("div", { class: "fw-bold" }, String(v)));
    statKids.push(
      el("div", { class: "row g-2 mb-3" }, item("Empfangen", c.rxGood), item("Empfangsfehler", c.rxBad), item("Gesendet", c.tx), item("Weitergeleitet", c.relay), item("Pings", c.pings), item("Antworten", c.pongs)),
    );
  }
  if (st?.heard?.length) {
    statKids.push(el("div", { class: "fw-bold small mb-1" }, "Zuletzt gehört"));
    statKids.push(
      table(
        ["Knoten", "RSSI", "SNR", "vor"],
        st.heard.map((h) => [nodeName(h.from), h.rssi + " dBm", h.snr.toFixed(1) + " dB", h.ago + " s"]),
      ),
    );
  }
  if (!st) statKids.push(hint("Noch keine Werte geladen."));
  const statBox = group(
    "Funk-Statistik",
    ...statKids,
    btn("Aktualisieren", () => kiraSend("stats"), "outline-secondary", "fa-sync"),
  );

  // Reichweitentest
  const rangeKids = [
    hint("Sendet einen Ping an alle direkt erreichbaren ThinkKira-Geräte (ohne Weiterleitung). Jede Antwort zeigt, wie gut beide Seiten sich hören."),
  ];
  if (st?.range?.length)
    rangeKids.push(
      table(
        ["#", "Gerät", "dort gehört", "hier gehört"],
        st.range.map((r) => [String(r.seq), nodeName(r.from), r.rssiThem + " dBm / " + r.snrThem.toFixed(1) + " dB", r.rssiUs + " dBm / " + r.snrUs.toFixed(1) + " dB"]),
      ),
    );
  const rangeBox = group(
    "Reichweitentest",
    ...rangeKids,
    btn(
      "Ping senden",
      async () => {
        if (await kiraSend("ping")) toast("Ping gesendet. Antworten erscheinen hier.");
      },
      "primary",
      "fa-satellite-dish",
    ),
  );

  const later = [
    ["WLAN-Weboberfläche, Update aus GitHub-Release", 5],
    ["Energieprofile (Wandern / Basis / Maximal sparen)", 6],
    ["SOS-Einstellungen", 7],
    ["Wecker & Erinnerungen", 7],
  ];
  const ul = el("ul", { class: "list-group list-group-flush" });
  for (const [t, ph] of later)
    ul.append(el("li", { class: "list-group-item px-0 d-flex justify-content-between align-items-center gap-2" }, t, el("span", { class: "badge text-bg-secondary" }, `ab Phase ${ph}`)));
  if (state.device && k && !st && !state.kiraStatsAsked) {
    state.kiraStatsAsked = true;
    setTimeout(() => kiraSend("stats"), 0);
  }
  // Design (Oberfläche) aus dem ThinkKira Designer
  const ui = state.ui;
  const designBox = group(
    "Design der Oberfläche",
    hint("Das Design erstellst du im ThinkKira Designer (geht auch ohne Gerät) und exportierst es als Datei. Hier überträgst du die Datei aufs Gerät. Das Gerät übernimmt sie sofort."),
    ui
      ? el(
          "div",
          { class: "small mb-1" },
          el("div", {}, "Seiten: " + [...ui.order].filter((c) => ui.pages & (1 << +c)).map((c) => ["Start", "Nachrichten", "Navigation", "Karte", "Knoten", "Einstellungen"][+c]).join(" → ")),
          el("div", {}, "Schnellantworten: " + ui.replies.join(", ")),
        )
      : el("div", { class: "alert alert-warning py-2 mb-1" }, "Das Gerät kennt noch kein Design. Bitte ThinkKira 0.3.2 oder neuer über den Loader aufspielen."),
    btn(
      "Design-Datei ans Gerät übertragen …",
      async () => {
        const f = await pickFile();
        if (!f) return;
        try {
          const d = parseDesign(await f.text());
          if (!state.device) return toast("Bitte zuerst das Gerät verbinden.", true);
          // Reihenfolge bleibt erhalten (Sendewarteschlange); das Gerät bestätigt am Ende mit „M|ok“
          for (const c of [uiCommand(d), ...menuCommands(d.menus)]) kiraSend(c);
          toast("Design „" + f.name + "“ wird übertragen …");
        } catch (e) {
          toast(e.message, true);
        }
      },
      "primary",
      "fa-upload",
    ),
    ui
      ? btn(
          "Design vom Gerät herunterladen",
          () => {
            // dasselbe Dateiformat wie der Designer; fehlt das Menü des Geräts (alte Firmware), gelten die Standardmenüs
            let menus = null;
            try {
              menus = state.menuText ? parseMenu(state.menuText) : null;
            } catch {}
            exportDesign(menus && menus[5]?.length ? { ...ui, menus } : ui);
          },
          "outline-secondary",
          "fa-download",
        )
      : null,
  );
  // Offline-Karte
  if (k && state.mapInfo === undefined && !state.mapAsked) {
    state.mapAsked = true;
    setTimeout(() => kiraSend("mapi"), 0);
  }
  const mi = state.mapInfo,
    up = state.mapUp;
  const mapBox = group(
    "Offline-Karte",
    mi
      ? el("div", { class: "small mb-2" }, `Im Gerät: ${Math.round(mi.size / 1024)} KB, Detailstufe ${mi.level}, ${mi.bbox[0].toFixed(2)}–${mi.bbox[2].toFixed(2)} N, ${mi.bbox[1].toFixed(2)}–${mi.bbox[3].toFixed(2)} O`)
      : el("div", { class: "small text-muted mb-2" }, mi === false ? "Keine Karte im Gerät." : "Frage das Gerät …"),
    up
      ? el(
          "div",
          {},
          el("div", { class: "small mb-1" }, `Übertrage „${up.label}“ … ${Math.round(up.sent / 1024)} von ${Math.round(up.total / 1024)} KB`),
          el("div", { class: "progress mb-2", role: "progressbar", "aria-label": "Fortschritt" }, el("div", { class: "progress-bar", style: `width:${Math.round((100 * up.sent) / up.total)}%` })),
          btn("Abbrechen", () => (up.cancel = true), "outline-danger", "fa-times"),
        )
      : el(
          "div",
          {},
          mapPicker(),
          btn(
            "Karte laden",
            async () => {
              const m = (state.mapList || FALLBACK_MAPS).find((x) => x.name === state.mapPick) ?? FALLBACK_MAPS[0];
              try {
                toast("Lade Karte „" + m.title + "“ …");
                const r = await fetch(firmwareUrl() + "?map=" + encodeURIComponent(m.name));
                if (!r.ok) throw deFehler("Karte nicht erreichbar (" + r.status + ").");
                await uploadMap(new Uint8Array(await r.arrayBuffer()), m.title);
              } catch (e) {
                toast(fehlerText(e), true);
              }
            },
            "primary",
            "fa-map",
          ),
          btn(
            "Kartendatei wählen …",
            async () => {
              const f = await pickFile(".tkm");
              if (f) await uploadMap(new Uint8Array(await f.arrayBuffer()), f.name);
            },
            "outline-secondary",
            "fa-folder-open",
          ),
          mi ? btn("Karte löschen", () => confirm("Die Offline-Karte im Gerät löschen?") && kiraSend("mapx"), "outline-danger", "fa-trash") : null,
        ),
    hint("Übertragung per USB dauert einige Minuten. Detailkarten zeigen auch Wege und Pfade, die groben Karten nur Hauptstraßen, Flüsse und Orte. Kartendaten © OpenStreetMap-Mitwirkende (ODbL)."),
  );
  return el("div", {}, grid(modeBox, statBox), grid(rangeBox, designBox), grid(mapBox, group("Kommt noch", ul)));
}

function table(head, rows) {
  return el(
    "div",
    { class: "table-responsive" },
    el(
      "table",
      { class: "table table-sm table-striped mb-2" },
      el("thead", {}, el("tr", {}, ...head.map((h) => el("th", {}, h)))),
      el("tbody", {}, ...rows.map((r) => el("tr", {}, ...r.map((c) => el("td", {}, c))))),
    ),
  );
}

function pageSystem() {
  const restore = el("input", { type: "file", class: "form-control form-control-sm", accept: "application/json,.json" });
  restore.addEventListener("change", () => restoreBackup(restore.files[0]));
  return grid(
    group(
      "Sicherung",
      hint("Alle Einstellungen, Kanäle und den Namen als Datei sichern oder zurückspielen."),
      btn("Alle Einstellungen sichern", downloadBackup, "primary", "fa-download"),
      el("div", { class: "mt-3" }, el("label", { class: "form-label small mb-1" }, "Sicherung wiederherstellen"), restore),
    ),
    group(
      "Gerät",
      btn("Neustart", () => state.device?.reboot(2), "outline-secondary", "fa-redo"),
      btn(
        "Werkseinstellungen",
        () => {
          if (confirm("Alle Einstellungen auf Werkseinstellungen zurücksetzen?")) state.device?.factoryResetConfig();
        },
        "outline-danger",
        "fa-exclamation-triangle",
      ),
    ),
  );
}

function pageContent() {
  const p = state.page;
  if (p === "device") return pageDevice();
  if (p === "channels") return pageChannels();
  if (p.startsWith("cfg:")) return pageConfig(p.slice(4));
  if (p === "modules") return pageModules();
  if (p === "waypoints") return pageWaypoints();
  if (p === "canned") return pageCanned();
  if (p === "thinkkira") return pageThinkKira();
  return pageSystem();
}

// ---------- Rahmen ----------

let toastTimer;
function toast(text, bad = false) {
  const t = root.querySelector(".tk-msg");
  if (!t) return;
  t.replaceChildren(el("div", { class: "alert shadow py-2 mb-0 " + (bad ? "alert-danger" : "alert-success") }, text));
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.replaceChildren(), 5000);
}

function render() {
  if (!root) return;
  const connected = !!state.device;
  const hasSerial = "serial" in navigator;
  const hasBle = "bluetooth" in navigator;
  const ok = state.status === "verbunden";

  const bar = el(
    "div",
    { class: "d-flex flex-wrap gap-2 align-items-center mb-3" },
    connected ? null : el("button", { type: "button", class: "btn btn-primary", disabled: hasSerial ? null : "", onclick: () => connect("serial") }, icon("fa-plug"), "Per USB verbinden"),
    connected ? null : el("button", { type: "button", class: "btn btn-primary", disabled: hasBle ? null : "", onclick: () => connect("ble") }, icon("fa-plug"), "Per Bluetooth verbinden"),
    connected ? el("button", { type: "button", class: "btn btn-outline-secondary", onclick: disconnect }, icon("fa-times"), "Trennen") : null,
    el("span", { class: "badge " + (ok ? "text-bg-success" : "text-bg-secondary") }, connected ? state.status : state.status === "getrennt" ? "nicht verbunden" : state.status),
  );

  const kids = [bar, root.querySelector(".tk-msg") ?? el("div", { class: "tk-msg position-fixed bottom-0 end-0 p-3 z-3", role: "status", "aria-live": "polite" })];

  if (!hasSerial && !hasBle)
    kids.push(el("div", { class: "alert alert-warning" }, "Dein Browser kann nicht auf USB oder Bluetooth zugreifen. Bitte Chrome oder Edge am Computer verwenden."));

  if (!connected) {
    kids.push(el("p", { class: "text-muted" }, "Gerät per USB-Kabel oder Bluetooth verbinden. Danach lassen sich alle Einstellungen ändern."));
  } else {
    kids.push(infoRow());
    const nav = el("ul", { class: "nav nav-pills flex-wrap gap-1 mb-3" });
    for (const pg of PAGES)
      nav.append(
        el(
          "li",
          { class: "nav-item" },
          el(
            "button",
            {
              type: "button",
              class: "nav-link py-1 px-2" + (state.page === pg.id ? " active" : ""),
              onclick: () => {
                state.page = pg.id;
                render();
              },
            },
            icon(pg.ic),
            pg.title,
          ),
        ),
      );
    kids.push(nav, pageContent());
  }
  root.replaceChildren(...kids.filter(Boolean));
}

export function mount(target = "#tk-config") {
  root = typeof target === "string" ? document.querySelector(target) : target;
  if (!root) return;
  render();
}

// Automatisch starten, wenn der Platzhalter da ist
if (typeof document !== "undefined") {
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", () => mount());
  else mount();
}
