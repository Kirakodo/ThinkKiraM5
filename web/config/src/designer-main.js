// ThinkKira Designer – eigenständig, ohne Gerät. Entwurf bleibt im Browser gespeichert (localStorage),
// Export/Import als Design-Datei. Übertragen aufs Gerät: Konfigurator → ThinkKira → „Design-Datei ans Gerät übertragen“.
// Einbettung: <div id="tk-designer"></div> + dieses Modul.
// SPDX-License-Identifier: GPL-3.0-only
import { el } from "./form.js";
import { DEFAULT_UI, checkDesign, copy, designJson, designerView, exportDesign, parseDesign, pickFile } from "./designer.js";

const KEY = "thinkkira-design";
let root,
  d,
  preview = 0,
  previewMenu = false,
  msgTimer;

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
    },
    typed: save,
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
    el("p", { class: "text-muted" }, "Hier stellst du die Oberfläche des ThinkKira ein – ganz ohne Gerät. Der Entwurf bleibt in diesem Browser gespeichert."),
    el("div", { class: "tk-msg" }),
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
