// ThinkKira Konfigurator
// Verbindet sich per USB (Web Serial) oder Bluetooth (Web Bluetooth) mit dem Gerät und
// bearbeitet alle Einstellungen. Einbettung: <div id="tk-config"></div> + dieses Modul + CSS.
// SPDX-License-Identifier: GPL-3.0-only
import "./shim.js";
import "./style.css";
import { MeshDevice, Protobuf } from "@meshtastic/core";
import { TransportWebSerial } from "@meshtastic/transport-web-serial";
import { TransportWebBluetooth } from "@meshtastic/transport-web-bluetooth";
import { create, toJson, fromJson, clone } from "@bufbuild/protobuf";
import { renderMessage, el, group, fehlerText } from "./form.js";
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
    state.config = {};
    state.moduleConfig = {};
    state.channels = [];
    state.nodes.clear();
    state.kira = null;
    state.kiraStats = null;
    state.kiraStatsAsked = false;
    state.wifiNets = null;

    device.events.onDeviceStatus.subscribe((s) => {
      if (s === STATUS_CONFIGURED) {
        setStatus("verbunden");
        kiraSend("get");
      }
      else if (s === 2) setStatus("getrennt");
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
    setStatus("Fehler: " + fehlerText(e));
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
    toast("Fehler beim Speichern: " + fehlerText(e), true);
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
  const name = el("input", { type: "text", class: "form-control form-control-sm", placeholder: "Name", maxlength: "29" });
  const lat = el("input", { type: "number", class: "form-control form-control-sm", step: "any", placeholder: "Breite, z. B. 52.3906" });
  const lon = el("input", { type: "number", class: "form-control form-control-sm", step: "any", placeholder: "Länge, z. B. 13.0645" });
  const gpxIn = el("input", { type: "file", class: "form-control form-control-sm", accept: ".gpx,application/gpx+xml" });
  gpxIn.addEventListener("change", async () => {
    const list = parseGpx(await gpxIn.files[0].text());
    for (const w of list) await sendWaypoint(w);
    toast(`${list.length} Wegpunkte gesendet`);
    render();
  });
  const ul = el("ul", { class: "list-group list-group-flush" });
  for (const w of state.waypoints.values())
    ul.append(el("li", { class: "list-group-item px-0" }, `${w.name} – ${(w.latitudeI * 1e-7).toFixed(5)}, ${(w.longitudeI * 1e-7).toFixed(5)}`));
  if (!state.waypoints.size) ul.append(el("li", { class: "list-group-item px-0 text-muted" }, "Noch keine Wegpunkte in dieser Sitzung."));

  return grid(
    group(
      "Wegpunkt senden",
      hint("Wird als Meshtastic-Wegpunkt an alle gesendet. Liste und Navigation im Gerät kommen mit Firmware-Phase 4."),
      el("div", { class: "mb-2" }, el("label", { class: "form-label small mb-1" }, "Name"), name),
      el("div", { class: "row g-2" }, el("div", { class: "col-6" }, lat), el("div", { class: "col-6" }, lon)),
      btn(
        "Wegpunkt senden",
        async () => {
          if (!name.value || !lat.value || !lon.value) return toast("Name, Breite und Länge ausfüllen", true);
          await sendWaypoint({ name: name.value, lat: parseFloat(lat.value), lon: parseFloat(lon.value) });
          toast("Wegpunkt gesendet");
          render();
        },
        "primary",
        "fa-paper-plane",
      ),
    ),
    group(
      "GPX",
      el("div", { class: "mb-2" }, el("label", { class: "form-label small mb-1" }, "GPX-Datei importieren und senden"), gpxIn),
      btn(
        "GPX exportieren",
        () => {
          const blob = new Blob([toGpx([...state.waypoints.values()])], { type: "application/gpx+xml" });
          el("a", { href: URL.createObjectURL(blob), download: "thinkkira-wegpunkte.gpx" }).click();
        },
        "outline-secondary",
        "fa-file-export",
      ),
      el("div", { class: "mt-3 small fw-bold" }, "Bekannte Wegpunkte"),
      ul,
    ),
  );
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
    ["Seiten ein/aus, Licht, Buzzer, LEDs", 3],
    ["Tastenbelegung", 3],
    ["Kompass, Ankunftsradius, Track", 4],
    ["Offline-Karte hochladen", 4],
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
  return el("div", {}, grid(modeBox, statBox), grid(rangeBox, group("Kommt noch", ul)));
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
  t.replaceChildren(el("div", { class: "alert py-2 mb-3 " + (bad ? "alert-danger" : "alert-success") }, text));
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

  const kids = [bar, root.querySelector(".tk-msg") ?? el("div", { class: "tk-msg" })];

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
