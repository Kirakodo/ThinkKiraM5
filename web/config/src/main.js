// ThinkKira Configurator
// Verbindet sich per USB (Web Serial) oder Bluetooth (Web Bluetooth) mit dem Gerät und
// bearbeitet alle Einstellungen. Einbettung: <div id="tk-config"></div> + dieses Modul + CSS.
// SPDX-License-Identifier: GPL-3.0-only
import "./shim.js";
import "./style.css";
import { MeshDevice, Protobuf } from "@meshtastic/core";
import { TransportWebSerial } from "@meshtastic/transport-web-serial";
import { TransportWebBluetooth } from "@meshtastic/transport-web-bluetooth";
import { create, toJson, fromJson, clone } from "@bufbuild/protobuf";
import { renderMessage, el } from "./form.js";
import { SECTION_LABELS } from "./labels.js";

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
    state.config = {};
    state.moduleConfig = {};
    state.channels = [];
    state.nodes.clear();

    device.onDeviceStatus.subscribe((s) => {
      if (s === STATUS_CONFIGURED) setStatus("verbunden");
      else if (s === 2) setStatus("getrennt");
      else if (s === 6) setStatus("lese Einstellungen …");
    });
    device.onMyNodeInfo.subscribe((i) => (state.myNodeNum = i.myNodeNum));
    device.onDeviceMetadataPacket.subscribe((m) => {
      state.metadata = m.data;
      render();
    });
    device.onConfigPacket.subscribe((c) => {
      if (c.payloadVariant.case) state.config[c.payloadVariant.case] = c.payloadVariant.value;
      renderSoon();
    });
    device.onModuleConfigPacket.subscribe((c) => {
      if (c.payloadVariant.case) state.moduleConfig[c.payloadVariant.case] = c.payloadVariant.value;
      renderSoon();
    });
    device.onChannelPacket.subscribe((ch) => {
      state.channels[ch.index] = ch;
      renderSoon();
    });
    device.onNodeInfoPacket.subscribe((n) => {
      state.nodes.set(n.num, n);
      renderSoon();
    });
    device.onWaypointPacket.subscribe((w) => {
      state.waypoints.set(w.data.id, { ...w.data, from: w.from });
      renderSoon();
    });

    await device.configure();
    setStatus("verbunden");
  } catch (e) {
    console.error(e);
    setStatus("Fehler: " + (e?.message ?? e));
  }
}

async function disconnect() {
  try {
    await state.device?.disconnect();
  } catch {}
  state.device = null;
  setStatus("getrennt");
}

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
  if (!d) return;
  try {
    await d.beginEditSettings?.();
    await fn(d);
    await d.commitEditSettings();
    toast("Gespeichert. Das Gerät startet ggf. neu.");
    state.dirty = false;
  } catch (e) {
    console.error(e);
    toast("Fehler beim Speichern: " + (e?.message ?? e), true);
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
  await withEdit(async (d) => {
    for (const j of Object.values(data.config)) await d.setConfig(fromJson(P.Config.ConfigSchema, j));
    for (const j of Object.values(data.moduleConfig ?? {})) await d.setModuleConfig(fromJson(P.ModuleConfig.ModuleConfigSchema, j));
    for (const j of data.channels ?? []) await d.setChannel(fromJson(P.Channel.ChannelSchema, j));
    if (data.owner) await d.setOwner(fromJson(P.Mesh.UserSchema, data.owner));
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

// ---------- Seiten ----------

const PAGES = [
  { id: "device", title: "Gerät", group: "Gerät" },
  { id: "channels", title: "Kanäle", group: "Funk" },
  ...["lora", "position", "power", "network", "bluetooth", "display", "security"].map((c) => ({
    id: "cfg:" + c,
    title: SECTION_LABELS[c],
    group: c === "lora" ? "Funk" : "Einstellungen",
  })),
  { id: "modules", title: "Module", group: "Module" },
  { id: "waypoints", title: "Wegpunkte", group: "ThinkKira" },
  { id: "canned", title: "Schnellantworten", group: "ThinkKira" },
  { id: "thinkkira", title: "ThinkKira-Funktionen", group: "ThinkKira" },
  { id: "system", title: "System & Backup", group: "System" },
];

function pageDevice() {
  const box = el("div");
  const md = state.metadata;
  box.append(
    el("h3", {}, "Gerät"),
    el(
      "dl",
      { class: "tk-info" },
      el("dt", {}, "Knoten-Nr."),
      el("dd", {}, state.myNodeNum ? "!" + state.myNodeNum.toString(16).padStart(8, "0") : "–"),
      el("dt", {}, "Firmware"),
      el("dd", {}, md?.firmwareVersion ?? "–"),
      el("dt", {}, "Knoten bekannt"),
      el("dd", {}, String(state.nodes.size)),
    ),
  );
  const me = state.nodes.get(state.myNodeNum);
  if (me?.user) {
    const user = clone(P.Mesh.UserSchema, me.user);
    box.append(el("h3", {}, "Name"));
    box.append(
      renderMessage(P.Mesh.UserSchema, user, {
        skip: ["id", "macaddr", "hwModel", "publicKey", "role"],
      }),
    );
    box.append(el("button", { class: "tk-btn", onclick: () => withEdit((d) => d.setOwner(user)) }, "Name speichern"));
  }
  if (state.config.device) {
    box.append(el("h3", {}, "Geräte-Einstellungen"));
    box.append(renderMessage(P.Config.Config_DeviceConfigSchema, state.config.device));
    box.append(el("button", { class: "tk-btn", onclick: () => saveConfig("device") }, "Speichern"));
  }
  return box;
}

function pageConfig(section) {
  const msg = state.config[section];
  if (!msg) return el("p", {}, "Noch nicht vom Gerät geladen.");
  const schema = P.Config.ConfigSchema.fields.find((f) => f.localName === section).message;
  return el(
    "div",
    {},
    el("h3", {}, SECTION_LABELS[section] ?? section),
    section === "lora" ? el("p", { class: "tk-hint" }, "Für Deutschland: Region EU_868. Der eigene ThinkKira-Funkmodus kommt mit Firmware-Phase 2.") : null,
    renderMessage(schema, msg),
    el("button", { class: "tk-btn", onclick: () => saveConfig(section) }, "Speichern"),
  );
}

function pageChannels() {
  const box = el("div", {}, el("h3", {}, "Kanäle"));
  for (let i = 0; i < 8; i++) {
    const ch = state.channels[i];
    if (!ch) continue;
    const fs = el("fieldset", { class: "tk-sub" }, el("legend", {}, `Kanal ${i}${i === 0 ? " (primär)" : ""}`));
    fs.append(renderMessage(P.Channel.ChannelSchema, ch, { skip: ["index"] }));
    fs.append(el("button", { class: "tk-btn", onclick: () => withEdit((d) => d.setChannel(ch)) }, `Kanal ${i} speichern`));
    box.append(fs);
  }
  return box;
}

function pageModules() {
  const box = el("div", {}, el("h3", {}, "Module"));
  for (const f of P.ModuleConfig.ModuleConfigSchema.fields) {
    const msg = state.moduleConfig[f.localName];
    if (!msg) continue;
    const det = el("details", { class: "tk-sub" }, el("summary", {}, SECTION_LABELS[f.localName] ?? f.localName));
    det.append(renderMessage(f.message, msg), el("button", { class: "tk-btn", onclick: () => saveModule(f.localName) }, "Speichern"));
    box.append(det);
  }
  return box;
}

function pageWaypoints() {
  const box = el("div", {}, el("h3", {}, "Wegpunkte"));
  box.append(el("p", { class: "tk-hint" }, "Wegpunkte werden als Meshtastic-Waypoint an alle gesendet und vom Gerät gespeichert. Die Verwaltung im Gerät (Liste, Navigation) kommt mit Firmware-Phase 4."));
  const name = el("input", { type: "text", placeholder: "Name", maxlength: "29" });
  const lat = el("input", { type: "number", step: "any", placeholder: "Breite, z. B. 52.3906" });
  const lon = el("input", { type: "number", step: "any", placeholder: "Länge, z. B. 13.0645" });
  box.append(
    el("div", { class: "tk-inline" }, name, lat, lon),
    el(
      "button",
      {
        class: "tk-btn",
        onclick: async () => {
          if (!name.value || !lat.value || !lon.value) return toast("Name, Breite und Länge ausfüllen", true);
          await sendWaypoint({ name: name.value, lat: parseFloat(lat.value), lon: parseFloat(lon.value) });
          toast("Wegpunkt gesendet");
          render();
        },
      },
      "Wegpunkt senden",
    ),
  );
  const gpxIn = el("input", { type: "file", accept: ".gpx,application/gpx+xml" });
  gpxIn.addEventListener("change", async () => {
    const list = parseGpx(await gpxIn.files[0].text());
    for (const w of list) await sendWaypoint(w);
    toast(`${list.length} Wegpunkte gesendet`);
    render();
  });
  box.append(
    el("div", { class: "tk-row" }, el("label", {}, "GPX importieren"), gpxIn),
    el(
      "button",
      {
        class: "tk-btn tk-btn2",
        onclick: () => {
          const blob = new Blob([toGpx([...state.waypoints.values()])], { type: "application/gpx+xml" });
          el("a", { href: URL.createObjectURL(blob), download: "thinkkira-wegpunkte.gpx" }).click();
        },
      },
      "GPX exportieren",
    ),
  );
  const ul = el("ul", { class: "tk-list" });
  for (const w of state.waypoints.values())
    ul.append(el("li", {}, `${w.name} – ${(w.latitudeI * 1e-7).toFixed(5)}, ${(w.longitudeI * 1e-7).toFixed(5)}`));
  box.append(el("h4", {}, "Bekannte Wegpunkte (diese Sitzung)"), ul);
  return box;
}

function pageCanned() {
  const ta = el("textarea", { rows: "6", placeholder: "Eine Nachricht pro Zeile, z. B.\nOK\nBin unterwegs\nBrauche Hilfe" });
  return el(
    "div",
    {},
    el("h3", {}, "Schnellantworten"),
    el("p", { class: "tk-hint" }, "Erscheinen auf dem Gerät unter Nachrichten → Antworten."),
    ta,
    el(
      "button",
      {
        class: "tk-btn",
        onclick: () =>
          withEdit((d) =>
            d.setCannedMessages(
              create(P.CannedMessages.CannedMessageModuleConfigSchema, {
                messages: ta.value.split("\n").map((s) => s.trim()).filter(Boolean).join("|"),
              }),
            ),
          ),
      },
      "Speichern",
    ),
  );
}

function pageThinkKira() {
  const items = [
    ["Funkmodus Meshtastic / ThinkKira-Funk", 2],
    ["Funk-Statistik & Reichweitentest", 2],
    ["Seiten ein/aus, Licht, Buzzer, LEDs", 3],
    ["Tastenbelegung", 3],
    ["Kompass, Ankunftsradius, Track", 4],
    ["Offline-Karte hochladen", 4],
    ["WLAN-Weboberfläche, OTA", 5],
    ["Energieprofile (Wandern / Basis / Maximal sparen)", 6],
    ["SOS-Einstellungen", 7],
    ["Wecker & Erinnerungen", 7],
  ];
  const ul = el("ul", { class: "tk-list" });
  for (const [t, ph] of items) ul.append(el("li", {}, `${t} `, el("span", { class: "tk-badge" }, `ab Phase ${ph}`)));
  return el(
    "div",
    {},
    el("h3", {}, "ThinkKira-Funktionen"),
    el("p", { class: "tk-hint" }, "Diese Einstellungen laufen über ein eigenes ThinkKira-Modul (PortNum 287) und werden freigeschaltet, sobald die Firmware-Phase fertig ist."),
    ul,
  );
}

function pageSystem() {
  const restore = el("input", { type: "file", accept: "application/json,.json" });
  restore.addEventListener("change", () => restoreBackup(restore.files[0]));
  return el(
    "div",
    {},
    el("h3", {}, "Sicherung"),
    el("button", { class: "tk-btn", onclick: downloadBackup }, "Alle Einstellungen sichern"),
    el("div", { class: "tk-row" }, el("label", {}, "Sicherung wiederherstellen"), restore),
    el("h3", {}, "Gerät"),
    el("button", { class: "tk-btn tk-btn2", onclick: () => state.device?.reboot(2) }, "Neustart"),
    el(
      "button",
      {
        class: "tk-btn tk-danger",
        onclick: () => {
          if (confirm("Alle Einstellungen auf Werkseinstellungen zurücksetzen?")) state.device?.factoryResetConfig();
        },
      },
      "Werkseinstellungen",
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
  const t = root.querySelector(".tk-toast");
  t.textContent = text;
  t.className = "tk-toast tk-show" + (bad ? " tk-bad" : "");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => (t.className = "tk-toast"), 4000);
}

function render() {
  if (!root) return;
  const connected = !!state.device;
  const hasSerial = "serial" in navigator;
  const hasBle = "bluetooth" in navigator;

  const head = el(
    "div",
    { class: "tk-head" },
    el("span", { class: "tk-status" + (state.status === "verbunden" ? " tk-ok" : "") }, "● " + state.status),
    connected
      ? el("button", { class: "tk-btn tk-btn2", onclick: disconnect }, "Trennen")
      : el(
          "span",
          {},
          el("button", { class: "tk-btn", disabled: hasSerial ? null : "", onclick: () => connect("serial") }, "USB verbinden"),
          el("button", { class: "tk-btn", disabled: hasBle ? null : "", onclick: () => connect("ble") }, "Bluetooth verbinden"),
        ),
  );

  const main = el("div", { class: "tk-main" });
  if (!connected) {
    main.append(
      el(
        "div",
        { class: "tk-welcome" },
        el("h3", {}, "ThinkKira Configurator"),
        el("p", {}, "Gerät per USB-Kabel oder Bluetooth verbinden. Funktioniert in Chrome oder Edge (Bluetooth auch auf Android)."),
        !hasSerial && !hasBle ? el("p", { class: "tk-bad" }, "Dieser Browser unterstützt weder Web Serial noch Web Bluetooth.") : null,
      ),
    );
  } else {
    const nav = el("nav", { class: "tk-nav" });
    let group = "";
    for (const pg of PAGES) {
      if (pg.group !== group) {
        group = pg.group;
        nav.append(el("div", { class: "tk-navgroup" }, group));
      }
      nav.append(
        el(
          "button",
          {
            class: "tk-navbtn" + (state.page === pg.id ? " tk-active" : ""),
            onclick: () => {
              state.page = pg.id;
              render();
            },
          },
          pg.title,
        ),
      );
    }
    main.append(nav, el("section", { class: "tk-page" }, pageContent()));
  }

  const toastEl = root.querySelector(".tk-toast") ?? el("div", { class: "tk-toast" });
  root.replaceChildren(head, main, toastEl);
}

export function mount(target = "#tk-config") {
  root = typeof target === "string" ? document.querySelector(target) : target;
  if (!root) return;
  root.classList.add("tk-config");
  render();
}

// Automatisch starten, wenn der Platzhalter da ist
if (typeof document !== "undefined") {
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", () => mount());
  else mount();
}
