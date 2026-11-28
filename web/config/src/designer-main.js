// ThinkKira Designer – geht ohne Gerät. Entwurf bleibt im Browser gespeichert (localStorage),
// Export/Import als Design-Datei. Mit Gerät (USB, Bluetooth, WLAN): Design vom Gerät laden und Änderungen live übertragen.
// Einbettung: <div id="tk-designer"></div> + dieses Modul.
// SPDX-License-Identifier: GPL-3.0-only
import "./shim.js";
import { el } from "./form.js";
import {
  DEFAULT_UI,
  checkDesign,
  copy,
  designJson,
  designerView,
  exportDesign,
  parseDesign,
  pickFile,
  parseUi,
  uiCommand,
  menuCommands,
  tipsCommands,
  tipsToText,
  parseTipsText,
} from "./designer.js";
import { menuToText, parseMenu } from "./menu-model.js";
import { KiraLink, cleanHost } from "./live.js";

const KEY = "thinkkira-design";
let root,
  d,
  preview = 0,
  previewMenu = false,
  msgTimer;

// ---------- Live-Verbindung zum Gerät ----------
const live = {
  status: "nicht verbunden",
  on: localStorage.getItem("tk-designer-live") !== "0", // Änderungen sofort übertragen
  host: localStorage.getItem("tk-wlan-host") ?? "",
  version: null, // ThinkKira-Version im Gerät
  dev: {}, // Design im Gerät: ui, menuText, tips (Text)
  buf: { M: "", T: "" },
  sent: null, // zuletzt aufs Gerät gebracht: { ui, menu, tips }
  timer: null,
};
const link = new KiraLink(onDeviceText, (text, ok) => {
  live.status = text;
  if (ok) {
    live.dev = {};
    live.sent = null;
    ["get", "ui", "mg", "tg"].forEach((c) => link.send(c));
  }
  render();
});
const versionAtLeast = (v, min) => {
  const a = (v ?? "0").split(".").map(Number),
    b = min.split(".").map(Number);
  for (let i = 0; i < 3; i++) if ((a[i] || 0) !== b[i]) return (a[i] || 0) > b[i];
  return true;
};
const hasTips = () => versionAtLeast(live.version, "0.4.4");

function onDeviceText(text) {
  const [kind, a, b] = text.split("|");
  const chunk = text.slice(2);
  if (kind === "m") live.version = b;
  else if (kind === "u") live.dev.ui = parseUi(text.split("|").slice(1));
  else if (kind === "M") {
    if (chunk === "end") {
      live.dev.menuText = live.buf.M;
      live.buf.M = "";
    } else if (chunk === "ok") msg("Gerät: Seiten, Startseite, Tasten und Menüs übernommen.");
    else live.buf.M += chunk;
  } else if (kind === "T") {
    if (chunk === "end") {
      live.dev.tips = live.buf.T;
      live.buf.T = "";
    } else if (/^ok\|\d+$/.test(chunk)) msg("Gerät: Tipps übernommen.");
    else live.buf.T += chunk;
  } else if (kind === "err") msg("Gerät meldet: " + a, true);
  else return;
  // alles vom Gerät da: als „zuletzt übertragen“ merken, damit live nur Änderungen geschickt werden
  const g = live.dev;
  if (!live.sent && g.ui && g.menuText !== undefined && (g.tips !== undefined || !hasTips())) {
    let menus = null;
    try {
      menus = parseMenu(g.menuText);
    } catch {}
    live.sent = { ui: uiCommand(g.ui), menu: menus ? menuToText(menus) : g.menuText, tips: g.tips ?? "" };
  }
  render();
}

function deviceDesign() {
  const g = live.dev;
  if (!g.ui) return null;
  let menus;
  try {
    menus = parseMenu(g.menuText ?? "");
  } catch {
    menus = null;
  }
  return { ...g.ui, menus: menus && menus[5]?.length ? menus : copy(DEFAULT_UI).menus, tips: parseTipsText(g.tips ?? "") };
}

// Entwurf aufs Gerät: nur die Teile, die sich geändert haben
function pushToDevice(all = false) {
  if (!link.connected) return;
  const c = copy(d);
  const err = checkDesign(c);
  if (err) return msg("Nicht übertragen: " + err, true);
  const now = { ui: uiCommand(c), menu: menuToText(c.menus), tips: tipsToText(c.tips) };
  const last = all ? {} : (live.sent ?? {});
  const cmds = [];
  if (now.ui !== last.ui) cmds.push(now.ui);
  if (now.menu !== last.menu) cmds.push(...menuCommands(c.menus));
  if (hasTips() && now.tips !== last.tips) cmds.push(...tipsCommands(c.tips));
  if (!cmds.length) return all ? msg("Das Gerät hat schon diesen Stand.") : null;
  cmds.forEach((x) => link.send(x));
  live.sent = now;
  if (now.ui !== last.ui && now.menu === last.menu) msg("Gerät: Änderung übertragen.");
}

function schedulePush() {
  if (!live.on || !link.connected) return;
  clearTimeout(live.timer);
  live.timer = setTimeout(() => pushToDevice(), 800);
}

function liveBar() {
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
  const sw = el("input", { type: "checkbox", class: "form-check-input", role: "switch", id: "tk-live" });
  sw.checked = live.on;
  sw.addEventListener("change", () => {
    live.on = sw.checked;
    localStorage.setItem("tk-designer-live", live.on ? "1" : "0");
    if (live.on) pushToDevice();
    render();
  });
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
          { class: "d-flex flex-wrap gap-2 align-items-center mt-1" },
          el("div", { class: "form-check form-switch mt-2 me-2" }, sw, el("label", { class: "form-check-label", for: "tk-live" }, "Live: Änderungen sofort aufs Gerät")),
          button("Design vom Gerät laden", "fa-download", "outline-secondary", () => {
            const g = deviceDesign();
            if (!g) return msg("Das Gerät hat sein Design noch nicht geschickt. Bitte kurz warten.", true);
            d = copy(g);
            preview = 0;
            save();
            render();
            msg("Design vom Gerät geladen.");
          }),
          live.on ? null : button("Jetzt aufs Gerät übertragen", "fa-upload", "primary", () => pushToDevice(true)),
          hasTips() || !live.version ? null : el("span", { class: "small text-muted mt-2" }, "Tipps brauchen ThinkKira 0.4.4 oder neuer."),
        )
      : el("div", { class: "form-text" }, "Optional: Gerät verbinden, um sein Design zu laden und Änderungen live zu sehen. Für WLAN steht die Adresse auf dem Gerät unter Menü → WLAN & Web."),
  );
}

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return parseDesign(raw);
  } catch {}
  return copy(DEFAULT_UI);
}

function save() {
  try {
    localStorage.setItem(KEY, JSON.stringify(designJson(d)));
  } catch {}
}

function msg(text, bad = false) {
  const t = root.querySelector(".tk-msg");
  t.replaceChildren(el("div", { class: "alert py-2 mb-3 " + (bad ? "alert-danger" : "alert-success") }, text));
  clearTimeout(msgTimer);
  msgTimer = setTimeout(() => t.replaceChildren(), 5000);
}

const button = (text, ic, kind, onclick) =>
  el("button", { type: "button", class: "btn btn-sm btn-" + kind + " me-2 mt-2", onclick }, el("i", { class: "fas " + ic + " me-1" }), text);

function render() {
  const view = designerView({
    d,
    preview,
    hint: (t) => el("div", { class: "form-text mb-2" }, t),
    changed: () => {
      save();
      render();
      schedulePush();
    },
    typed: () => {
      save();
      schedulePush();
    },
    setPreview: (i) => {
      preview = i;
      render();
    },
    previewMenu,
    setPreviewMenu: (b) => {
      previewMenu = b;
      render();
    },
    actions: [
      button("Design herunterladen", "fa-download", "primary", () => {
        const err = checkDesign(d);
        if (err) return msg(err, true);
        save();
        exportDesign(d);
        msg("Design-Datei gespeichert. Übertragen: Konfigurator → ThinkKira → „Design-Datei ans Gerät übertragen“.");
      }),
      button("Design hochladen (weiter bearbeiten)", "fa-upload", "outline-secondary", async () => {
        const f = await pickFile();
        if (!f) return;
        try {
          d = parseDesign(await f.text());
          preview = 0;
          save();
          render();
          msg("Design „" + f.name + "“ geladen.");
        } catch (e) {
          msg(e.message, true);
        }
      }),
      button("Standard", "fa-magic", "outline-secondary", () => {
        d = copy(DEFAULT_UI);
        preview = 0;
        save();
        render();
      }),
    ],
  });
  root.replaceChildren(
    el("p", { class: "text-muted" }, "Hier stellst du die Oberfläche des ThinkKira ein, mit oder ohne Gerät. Der Entwurf bleibt in diesem Browser gespeichert."),
    liveBar(),
    root.querySelector(".tk-msg") ?? el("div", { class: "tk-msg" }), // Meldung bleibt beim Neuzeichnen stehen
    view,
  );
}

function start() {
  root = document.getElementById("tk-designer");
  if (!root) return;
  d = load();
  render();
}

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
else start();
