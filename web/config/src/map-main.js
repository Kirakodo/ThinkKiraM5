// ThinkKira Wegpunkt-Karte – Deutschland-Karte (OpenStreetMap), Wegpunkte per Klick setzen,
// als GPX auf dem PC speichern/laden und mit dem Gerät austauschen (USB, Bluetooth, WLAN).
// Einbettung: <div id="tk-map"></div> + dieses Modul. Die Leaflet-Darstellung bringt das Modul selbst mit.
// SPDX-License-Identifier: GPL-3.0-only
import "./shim.js";
import L from "leaflet";
import leafletCss from "leaflet/dist/leaflet.css?inline";
import { el } from "./form.js";
import { KiraLink, cleanHost } from "./live.js";
import { MAX_SPAN, buildMap, fetchOsm } from "./mapgen.js";

const KEY = "thinkkira-waypoints";
const MAX_DEVICE = 64; // so viele Wegpunkte speichert das Gerät
const NAME_MAX = 19;

let root, map, layer, msgTimer;
let wps = load(); // { id, name, lat, lon }
let selected = null;

// ---------- Gerät ----------
const live = { status: "nicht verbunden", host: localStorage.getItem("tk-wlan-host") ?? "", version: null, dev: null, buf: [], uploading: false };
const link = new KiraLink(onDeviceText, (text, ok) => {
  live.status = text;
  live.dev = null;
  if (ok) ["get", "wpl"].forEach((c) => link.send(c));
  renderSide();
});

function onDeviceText(text) {
  const f = text.split("|");
  if (f[0] === "m") live.version = f[2];
  else if (f[0] === "p" && f[1] === "end") {
    live.dev = live.buf;
    live.buf = [];
  } else if (f[0] === "p") live.buf.push({ name: f[2], lat: +f[3] * 1e-7, lon: +f[4] * 1e-7 });
  else if (f[0] === "err") msg("Gerät meldet: " + f[1], true);
  else return;
  renderSide();
}

const versionAtLeast = (v, min) => {
  const a = (v ?? "0").split(".").map(Number),
    b = min.split(".").map(Number);
  for (let i = 0; i < 3; i++) if ((a[i] || 0) !== b[i]) return (a[i] || 0) > b[i];
  return true;
};

const same = (a, b) => a.name === b.name && Math.abs(a.lat - b.lat) < 2e-6 && Math.abs(a.lon - b.lon) < 2e-6;

async function upload() {
  if (!live.dev) return msg("Das Gerät hat seine Wegpunkte noch nicht geschickt. Bitte kurz warten.", true);
  const todo = wps.filter((w) => !live.dev.some((d) => same(d, w)));
  if (!todo.length) return msg("Alle Wegpunkte sind schon auf dem Gerät.");
  const free = MAX_DEVICE - live.dev.length;
  if (todo.length > free) return msg(`Auf dem Gerät ist nur Platz für ${free} weitere Wegpunkte (höchstens ${MAX_DEVICE}). Bitte auf dem Gerät welche löschen oder weniger auswählen.`, true);
  const quiet = versionAtLeast(live.version, "0.5.1");
  live.uploading = true;
  renderSide();
  for (const w of todo) {
    link.send(`${quiet ? "wpq" : "wpa"}|${cleanName(w.name)}|${Math.round(w.lat * 1e7)}|${Math.round(w.lon * 1e7)}`);
    await new Promise((r) => setTimeout(r, quiet ? 150 : 600));
  }
  live.dev = null;
  link.send("wpl");
  live.uploading = false;
  msg(`${todo.length} Wegpunkt${todo.length === 1 ? "" : "e"} aufs Gerät geladen.`);
  renderSide();
}

function fromDevice() {
  if (!live.dev) return msg("Das Gerät hat seine Wegpunkte noch nicht geschickt. Bitte kurz warten.", true);
  const add = live.dev.filter((d) => !wps.some((w) => same(d, w)));
  add.forEach((d) => wps.push({ id: newId(), ...d }));
  save();
  drawMarkers();
  if (add.length) fitAll();
  msg(add.length ? `${add.length} Wegpunkt${add.length === 1 ? "" : "e"} vom Gerät übernommen.` : "Keine neuen Wegpunkte auf dem Gerät.");
  renderSide();
}

// ---------- Daten ----------
function load() {
  try {
    const a = JSON.parse(localStorage.getItem(KEY) ?? "[]");
    return Array.isArray(a) ? a.filter((w) => isFinite(w.lat) && isFinite(w.lon)) : [];
  } catch {
    return [];
  }
}
function save() {
  localStorage.setItem(KEY, JSON.stringify(wps));
}
const newId = () => Math.random().toString(36).slice(2, 10);
const cleanName = (n) => String(n ?? "").replace(/[|\n\r]/g, " ").trim().slice(0, NAME_MAX) || "WP";
function nextName() {
  for (let i = 1; ; i++) if (!wps.some((w) => w.name === "WP " + i)) return "WP " + i;
}

function toGpx(list) {
  const esc = (s) => String(s).replace(/[<>&"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;" })[c]);
  const body = list.map((w) => `  <wpt lat="${w.lat.toFixed(7)}" lon="${w.lon.toFixed(7)}"><name>${esc(w.name)}</name></wpt>`).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<gpx version="1.1" creator="ThinkKira" xmlns="http://www.topografix.com/GPX/1/1">\n${body}\n</gpx>\n`;
}
function parseGpx(text) {
  const doc = new DOMParser().parseFromString(text, "application/xml");
  if (doc.querySelector("parsererror")) throw new Error("Die Datei ist keine gültige GPX-Datei.");
  return [...doc.querySelectorAll("wpt")]
    .map((w) => ({ id: newId(), lat: parseFloat(w.getAttribute("lat")), lon: parseFloat(w.getAttribute("lon")), name: cleanName(w.querySelector("name")?.textContent) }))
    .filter((w) => isFinite(w.lat) && isFinite(w.lon) && Math.abs(w.lat) <= 90 && Math.abs(w.lon) <= 180);
}

function saveGpx() {
  if (!wps.length) return msg("Es sind noch keine Wegpunkte gesetzt.", true);
  const a = el("a", { href: URL.createObjectURL(new Blob([toGpx(wps)], { type: "application/gpx+xml" })), download: "thinkkira-wegpunkte.gpx" });
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 5000);
}

function loadGpx() {
  const inp = el("input", { type: "file", accept: ".gpx,application/gpx+xml,application/xml" });
  inp.addEventListener("change", async () => {
    const f = inp.files[0];
    if (!f) return;
    try {
      const list = parseGpx(await f.text());
      if (!list.length) return msg("In der Datei sind keine Wegpunkte.", true);
      const add = list.filter((n) => !wps.some((w) => same(w, n)));
      wps.push(...add);
      save();
      drawMarkers();
      fitAll();
      renderSide();
      msg(`${add.length} Wegpunkt${add.length === 1 ? "" : "e"} aus der Datei geladen.`);
    } catch (e) {
      msg(e.message, true);
    }
  });
  inp.click();
}

// ---------- Karte ----------
function icon(w) {
  const color = w.id === selected ? "#dc3545" : "#0d6efd";
  return L.divIcon({
    className: "",
    html: `<i class="fas fa-map-marker-alt" style="font-size:28px;color:${color};text-shadow:0 0 2px #fff"></i>`,
    iconSize: [22, 28],
    iconAnchor: [11, 28],
    tooltipAnchor: [0, -26],
  });
}

function drawMarkers() {
  layer.clearLayers();
  for (const w of wps) {
    const m = L.marker([w.lat, w.lon], { icon: icon(w), draggable: true, title: w.name });
    m.bindTooltip(w.name, { permanent: true, direction: "top", className: "small" });
    m.on("click", () => select(w.id));
    m.on("dragend", () => {
      const p = m.getLatLng();
      w.lat = +p.lat.toFixed(7);
      w.lon = +p.lng.toFixed(7);
      save();
      renderSide();
    });
    layer.addLayer(m);
  }
}

function select(id, pan = false) {
  selected = id;
  drawMarkers();
  renderSide();
  const w = wps.find((x) => x.id === id);
  if (pan && w) map.setView([w.lat, w.lon], Math.max(map.getZoom(), 14));
  root.querySelector(`[data-wp="${id}"]`)?.scrollIntoView({ block: "nearest" });
}

function fitAll() {
  if (wps.length === 1) map.setView([wps[0].lat, wps[0].lon], 14);
  else if (wps.length) map.fitBounds(L.latLngBounds(wps.map((w) => [w.lat, w.lon])), { padding: [30, 30], maxZoom: 15 });
}

async function search(q) {
  q = q.trim();
  if (!q) return;
  try {
    const r = await fetch("https://nominatim.openstreetmap.org/search?format=json&limit=1&accept-language=de&q=" + encodeURIComponent(q));
    const [hit] = await r.json();
    if (!hit) return msg("Ort nicht gefunden.", true);
    map.setView([+hit.lat, +hit.lon], 14);
  } catch {
    msg("Die Ortssuche ist gerade nicht erreichbar.", true);
  }
}

// ---------- Eigene Offline-Karte ----------
// area: null | { pick: [erste Ecke] } | { box: [s, w, n, e] }; result: { bytes, level, name }
const off = { area: null, rect: null, busy: false, status: "", result: null };
const KM = (box) => [(box[2] - box[0]) * 111.1, (box[3] - box[1]) * 111.3 * Math.cos((((box[0] + box[2]) / 2) * Math.PI) / 180)];
const tooBig = (box) => box[2] - box[0] > MAX_SPAN.lat || box[3] - box[1] > MAX_SPAN.lon;

function setArea(box) {
  off.area = box ? { box: box.map((x) => +x.toFixed(4)) } : null;
  off.result = null;
  off.rect?.remove();
  off.rect = box ? L.rectangle([[box[0], box[1]], [box[2], box[3]]], { color: tooBig(box) ? "#dc3545" : "#198754", weight: 2, fillOpacity: 0.08, interactive: false }).addTo(map) : null;
  renderSide();
}

function areaClick(ll) {
  if (!off.area?.pick) return false;
  const [a, b] = off.area.pick;
  if (!a) {
    off.area.pick = [ll];
    msg("Jetzt die gegenüberliegende Ecke anklicken.");
    return true;
  }
  setArea([Math.min(a.lat, ll.lat), Math.min(a.lng, ll.lng), Math.max(a.lat, ll.lat), Math.max(a.lng, ll.lng)]);
  return true;
}

async function makeOffline() {
  const box = off.area?.box;
  if (!box) return;
  if (tooBig(box)) return msg("Das Gebiet ist zu groß. Bitte höchstens etwa 90 × 80 km wählen.", true);
  off.busy = true;
  off.result = null;
  const status = (t) => {
    off.status = t;
    renderSide();
  };
  try {
    const big = (box[2] - box[0]) * (box[3] - box[1]) > 0.08;
    const data = await fetchOsm(box, status, big);
    const r = await buildMap(data, box, 700, 0, status);
    const rank = { city: 0, town: 1, village: 2 };
    const place = data.elements
      .filter((x) => x.type === "node" && rank[x.tags?.place] !== undefined && x.tags.name && x.lat >= box[0] && x.lat <= box[2] && x.lon >= box[1] && x.lon <= box[3])
      .sort((a, b) => rank[a.tags.place] - rank[b.tags.place] || (+b.tags.population || 0) - (+a.tags.population || 0))[0];
    const slug = (place?.tags.name ?? "gebiet").toLowerCase().replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    off.result = { ...r, name: `karte-${slug || "gebiet"}.tkm`, place: place?.tags.name };
    off.status = "";
  } catch (e) {
    off.status = "";
    msg(e.message ?? String(e), true);
  }
  off.busy = false;
  renderSide();
}

function saveOffline() {
  const r = off.result;
  const a = el("a", { href: URL.createObjectURL(new Blob([r.bytes], { type: "application/octet-stream" })), download: r.name });
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 5000);
}

function offlineBox() {
  const box = off.area?.box;
  const picking = !!off.area?.pick;
  const LEVEL = ["nur Hauptstraßen", "Straßen", "Straßen und Wege", "alle Wege und Pfade"];
  const info = box
    ? (() => {
        const [h, w] = KM(box);
        return el("div", { class: "small " + (tooBig(box) ? "text-danger" : "text-muted") }, `Gebiet: ${w.toFixed(0)} × ${h.toFixed(0)} km` + (tooBig(box) ? " – zu groß, höchstens etwa 90 × 80 km" : ""));
      })()
    : null;
  return el(
    "div",
    { class: "card card-body mb-3" },
    el("div", { class: "fw-bold" }, el("i", { class: "fas fa-map me-1" }), "Eigene Offline-Karte erstellen"),
    el("div", { class: "form-text" }, "Gebiet wählen, Karte bauen lassen (höchstens 700 KB), als Datei speichern. Aufs Gerät kommt sie im Konfigurator unter Offline-Karte → „Datei wählen“."),
    el(
      "div",
      {},
      button(picking ? "Zwei Ecken anklicken …" : "Gebiet auf der Karte wählen", "fa-vector-square", picking ? "warning" : "outline-primary", () => {
        off.area = picking ? null : { pick: [] };
        off.result = null;
        off.rect?.remove();
        if (!picking) msg("Erste Ecke des Gebiets auf der Karte anklicken.");
        renderSide();
      }, off.busy),
      button("Sichtbaren Ausschnitt nehmen", "fa-crop", "outline-primary", () => {
        const b = map.getBounds();
        setArea([b.getSouth(), b.getWest(), b.getNorth(), b.getEast()]);
      }, off.busy),
    ),
    info,
    box ? button(off.busy ? "Wird gebaut …" : "Karte bauen", "fa-cogs", "primary", makeOffline, off.busy || tooBig(box)) : null,
    off.status ? el("div", { class: "small mt-2" }, el("i", { class: "fas fa-spinner fa-spin me-1" }), off.status) : null,
    off.result
      ? el(
          "div",
          { class: "mt-2" },
          el("div", { class: "small" }, `Fertig: ${off.result.place ? off.result.place + ", " : ""}${Math.round(off.result.bytes.length / 1024)} KB, Detail: ${LEVEL[off.result.level]}.`),
          button("Karte speichern (.tkm)", "fa-save", "success", saveOffline),
        )
      : null,
    el("div", { class: "form-text" }, "Kartendaten © OpenStreetMap-Mitwirkende (ODbL)."),
  );
}

// ---------- Oberfläche ----------
function msg(text, bad = false) {
  const t = root.querySelector(".tk-msg");
  t.replaceChildren(el("div", { class: "alert py-2 mb-2 " + (bad ? "alert-danger" : "alert-success") }, text));
  clearTimeout(msgTimer);
  msgTimer = setTimeout(() => t.replaceChildren(), 6000);
}

const button = (text, ic, kind, onclick, disabled = false) =>
  el("button", { type: "button", class: "btn btn-sm btn-" + kind + " me-2 mt-2", onclick, disabled: disabled ? "" : null }, el("i", { class: "fas " + ic + " me-1" }), text);

function deviceBox() {
  const connected = link.connected;
  const busy = !!link.device && !connected;
  const hostInp = el("input", { type: "text", class: "form-control form-control-sm", placeholder: "Adresse im WLAN", value: live.host, "aria-label": "Adresse des Geräts im WLAN" });
  hostInp.addEventListener("input", () => (live.host = hostInp.value));
  const go = (kind) => async () => {
    try {
      if (kind === "wlan") localStorage.setItem("tk-wlan-host", (live.host = cleanHost(live.host)));
      await link.connect(kind, live.host);
    } catch (e) {
      msg(
        e.unreachable
          ? e.message + " Gerät und Computer im selben WLAN? Einmal https://" + live.host + " öffnen und die Zertifikats-Warnung bestätigen, dann nochmal verbinden."
          : "Verbindung fehlgeschlagen: " + (e.message ?? e),
        true,
      );
    }
  };
  const onDev = live.dev ? `${live.dev.length} von ${MAX_DEVICE} Wegpunkten auf dem Gerät` : connected ? "Wegpunkte werden gelesen …" : "";
  return el(
    "div",
    { class: "card card-body mb-3" },
    el(
      "div",
      { class: "d-flex flex-wrap gap-2 align-items-center" },
      el("span", { class: "fw-bold me-1" }, "Gerät:"),
      ...(connected || busy
        ? []
        : [
            "serial" in navigator ? button("USB", "fa-plug", "primary", go("serial")) : null,
            "bluetooth" in navigator ? button("Bluetooth", "fa-plug", "primary", go("ble")) : null,
            el("div", { class: "input-group input-group-sm w-auto mt-2" }, hostInp, el("button", { type: "button", class: "btn btn-primary", onclick: go("wlan") }, el("i", { class: "fas fa-wifi me-1" }), "WLAN")),
          ]),
      connected || busy ? button("Trennen", "fa-times", "outline-secondary", () => link.disconnect()) : null,
      el("span", { class: "badge mt-2 " + (connected ? "text-bg-success" : "text-bg-secondary") }, live.status + (connected && live.version ? " · ThinkKira " + live.version : "")),
    ),
    connected
      ? el(
          "div",
          {},
          button(live.uploading ? "Lädt …" : "Aufs Gerät laden", "fa-upload", "primary", upload, live.uploading || !wps.length),
          button("Vom Gerät holen", "fa-download", "outline-secondary", fromDevice, live.uploading),
          el("div", { class: "form-text" }, onDev + ". Schon vorhandene Wegpunkte werden nicht doppelt angelegt."),
        )
      : el("div", { class: "form-text" }, "Optional: Gerät verbinden, um Wegpunkte aufs Gerät zu laden oder von dort zu holen. Für WLAN steht die Adresse auf dem Gerät unter Menü → WLAN & Web."),
  );
}

function wpRow(w) {
  const name = el("input", { type: "text", class: "form-control form-control-sm", value: w.name, maxlength: String(NAME_MAX), "aria-label": "Name des Wegpunkts" });
  name.addEventListener("input", () => {
    w.name = cleanName(name.value);
    save();
  });
  name.addEventListener("change", () => drawMarkers());
  return el(
    "li",
    { class: "list-group-item px-2 py-1" + (w.id === selected ? " active" : ""), "data-wp": w.id },
    el(
      "div",
      { class: "d-flex gap-1 align-items-center" },
      name,
      el("button", { type: "button", class: "btn btn-sm btn-light", title: "Auf der Karte zeigen", "aria-label": "Auf der Karte zeigen", onclick: () => select(w.id, true) }, el("i", { class: "fas fa-crosshairs" })),
      el(
        "button",
        {
          type: "button",
          class: "btn btn-sm btn-light",
          title: "Löschen",
          "aria-label": "Löschen",
          onclick: () => {
            wps = wps.filter((x) => x !== w);
            save();
            drawMarkers();
            renderSide();
          },
        },
        el("i", { class: "fas fa-trash" }),
      ),
    ),
    el("div", { class: "small " + (w.id === selected ? "" : "text-muted") }, `${w.lat.toFixed(5)}, ${w.lon.toFixed(5)}`),
  );
}

function renderSide() {
  const side = root.querySelector(".tk-side");
  if (!side) return;
  const keep = side.querySelector(".list-group")?.scrollTop ?? 0;
  side.replaceChildren(
    deviceBox(),
    el(
      "div",
      { class: "mb-2" },
      button("Als GPX speichern", "fa-save", "primary", saveGpx, !wps.length),
      button("GPX laden", "fa-folder-open", "outline-secondary", loadGpx),
      button("Alle zeigen", "fa-expand", "outline-secondary", fitAll, !wps.length),
      wps.length
        ? button("Alle löschen", "fa-trash", "outline-danger", () => {
            if (root.querySelector(".tk-confirm")) {
              wps = [];
              save();
              drawMarkers();
              renderSide();
              return;
            }
            msg("Nochmal auf „Alle löschen“ klicken, um alle Wegpunkte auf der Karte zu entfernen. Das Gerät bleibt unverändert.", true);
            root.querySelector(".tk-msg").firstChild.classList.add("tk-confirm");
          })
        : null,
    ),
    offlineBox(),
    el("h2", { class: "h6 mt-2" }, `Wegpunkte (${wps.length})`),
    wps.length
      ? el("ul", { class: "list-group", style: "max-height:50vh;overflow:auto" }, ...wps.map(wpRow))
      : el("div", { class: "form-text" }, "Noch keine Wegpunkte. Auf die Karte klicken, um einen zu setzen. Punkte lassen sich mit der Maus verschieben."),
  );
  const lg = side.querySelector(".list-group");
  if (lg) lg.scrollTop = keep;
}

function mount(r) {
  root = r;
  if (!document.getElementById("tk-leaflet-css")) document.head.append(el("style", { id: "tk-leaflet-css" }, leafletCss));
  const q = el("input", { type: "search", class: "form-control form-control-sm", placeholder: "Ort suchen, z. B. Potsdam", "aria-label": "Ort suchen" });
  q.addEventListener("keydown", (e) => e.key === "Enter" && search(q.value));
  const mapDiv = el("div", { class: "border rounded", style: "height:70vh;min-height:380px" });
  root.replaceChildren(
    el("div", { class: "tk-msg" }),
    el(
      "div",
      { class: "row g-3" },
      el(
        "div",
        { class: "col-lg-8" },
        el("div", { class: "input-group input-group-sm mb-2" }, q, el("button", { type: "button", class: "btn btn-outline-secondary", onclick: () => search(q.value) }, el("i", { class: "fas fa-search me-1" }), "Suchen")),
        mapDiv,
        el("div", { class: "form-text" }, "Klick auf die Karte setzt einen Wegpunkt. Wegpunkte bleiben in diesem Browser gespeichert."),
      ),
      el("div", { class: "col-lg-4 tk-side" }),
    ),
  );
  map = L.map(mapDiv, { zoomControl: true }).setView([51.16, 10.45], 6);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);
  layer = L.layerGroup().addTo(map);
  map.on("click", (e) => {
    if (areaClick(e.latlng)) return;
    const w = { id: newId(), name: nextName(), lat: +e.latlng.lat.toFixed(7), lon: +e.latlng.lng.toFixed(7) };
    wps.push(w);
    save();
    select(w.id);
  });
  drawMarkers();
  if (wps.length) fitAll();
  renderSide();
}

const target = document.getElementById("tk-map");
if (target) mount(target);
