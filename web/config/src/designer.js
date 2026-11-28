// ThinkKira Designer – Bausteine für die Bildschirm-Oberfläche:
// Seiten-Reihenfolge und an/aus, Bausteine der Startseite, Schnellantworten, mit Vorschau (200×200 E-Ink).
// Design-Datei (JSON): { format: "thinkkira-design", version: 1, order, pages, start, replies[] }.
// Gerätebefehle auf Port 287: "ui" → "u|reihenfolge|seitenbits|bausteine|antwort;antwort;…", "ui|…" setzt.
// SPDX-License-Identifier: GPL-3.0-only
import { el, group } from "./form.js";

export const PAGES = ["Start", "Nachrichten", "Navigation", "Karte", "Knoten", "Einstellungen"];
const FIXED = [0, 5]; // Start und Einstellungen sind immer an
export const WIDGETS = {
  c: "Uhr (groß)",
  b: "Akku",
  g: "GPS-Status",
  s: "Letztes Signal",
  k: "Knoten online",
  n: "Ungelesene Nachrichten",
  m: "Funkmodus",
  p: "Position (Koordinaten)",
};
const SAMPLE = {
  b: "Akku 87%",
  g: "GPS: Fix, 9 Sat.",
  s: "Signal: -92 dBm (vor 2m)",
  k: "Knoten online: 4",
  n: "Ungelesen: 2",
  m: "Funk: Meshtastic",
  p: "52.3906 N  13.0645 O",
};
const MAX_REPLIES_LEN = 169;
export const MAX_LEN = 169;
export const DEFAULT_UI = {
  order: "012345",
  pages: 63,
  start: "cbgsknm",
  replies: ["OK", "Ja", "Nein", "Bin unterwegs", "Komme gleich", "Alles gut", "Wo bist du?", "Brauche Hilfe"],
};

// "u|…"-Antwort vom Gerät lesen
export function parseUi(fields) {
  const [order, pages, start, ...rest] = fields;
  return { order, pages: +pages, start: start ?? "", replies: rest.join("|").split(";").filter(Boolean) };
}

export function uiCommand(d) {
  return ["ui", d.order, String(d.pages | 0x21), d.start, d.replies.join(";")].join("|");
}

export const copy = (u) => ({ order: u.order, pages: u.pages, start: u.start, replies: [...u.replies] });

export function exportDesign(d, name = "thinkkira-design.json") {
  const json = JSON.stringify({ format: "thinkkira-design", version: 1, ...copy(d) }, null, 2);
  const a = el("a", { href: URL.createObjectURL(new Blob([json], { type: "application/json" })), download: name });
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

// Prüft eine Design-Datei; wirft einen Fehler mit deutschem Text, wenn sie nicht passt
export function parseDesign(text) {
  let j;
  try {
    j = JSON.parse(text);
  } catch {
    throw new Error("Die Datei ist keine gültige Design-Datei (kein JSON).");
  }
  if (j?.format !== "thinkkira-design") throw new Error("Das ist keine ThinkKira-Design-Datei.");
  const order = String(j.order ?? "");
  if (order.length !== 6 || [...order].sort().join("") !== "012345") throw new Error("Die Seiten-Reihenfolge in der Datei ist ungültig.");
  const start = String(j.start ?? "");
  if (start.length > 11 || [...start].some((w) => !WIDGETS[w])) throw new Error("Die Startseiten-Bausteine in der Datei sind ungültig.");
  const replies = (Array.isArray(j.replies) ? j.replies : []).map((r) => String(r).replace(/[;|\n]/g, "").trim()).filter(Boolean);
  if (!replies.length || replies.join(";").length > MAX_REPLIES_LEN) throw new Error("Die Schnellantworten in der Datei fehlen oder sind zu lang.");
  return { order, pages: (+j.pages & 63) | 0x21, start, replies };
}

export function pickFile(accept = ".json,application/json") {
  return new Promise((res) => {
    const inp = el("input", { type: "file", accept });
    inp.addEventListener("change", () => res(inp.files[0] ?? null));
    inp.click();
  });
}

// Prüft vor dem Übertragen/Exportieren; gibt einen Fehlertext oder null zurück
export function checkDesign(d) {
  d.replies = d.replies.map((x) => x.trim()).filter(Boolean);
  if (!d.replies.length) return "Mindestens eine Schnellantwort wird gebraucht.";
  if (d.replies.join(";").length > MAX_REPLIES_LEN) return "Die Schnellantworten sind zusammen zu lang. Bitte kürzen.";
  return null;
}
const move = (arr, i, dir) => {
  const j = i + dir;
  if (j < 0 || j >= arr.length) return arr;
  const a = [...arr];
  [a[i], a[j]] = [a[j], a[i]];
  return a;
};
const smallBtn = (ic, title, onclick, disabled) =>
  el("button", { type: "button", class: "btn btn-sm btn-outline-secondary", title, "aria-label": title, onclick, disabled: disabled ? "" : null }, el("i", { class: "fas " + ic }));

// Vorschau der Startseite + Seitenpunkte, so wie das Gerät sie zeichnet (vereinfacht)
function drawPreview(canvas, d, pageIdx) {
  const s = 2; // 200×200 doppelt groß
  const c = canvas.getContext("2d");
  c.setTransform(s, 0, 0, s, 0, 0);
  c.fillStyle = "#fff";
  c.fillRect(0, 0, 200, 200);
  c.fillStyle = "#000";
  c.strokeStyle = "#000";
  c.lineWidth = 1;
  c.textBaseline = "top";
  const page = +d.order[pageIdx];
  c.font = "9px sans-serif";
  c.fillText(page === 0 ? "ThinkKira" : PAGES[page], 2, 2);
  c.textAlign = "right";
  c.fillText("12:34  87%", 198, 2);
  c.textAlign = "left";
  c.beginPath();
  c.moveTo(0, 14.5);
  c.lineTo(200, 14.5);
  c.stroke();
  let y = 20;
  if (page === 0) {
    for (const w of d.start) {
      if (y > 184) break;
      if (w === "c") {
        c.font = "bold 34px sans-serif";
        c.textAlign = "center";
        c.fillText("12:34", 100, y);
        c.textAlign = "left";
        y += 42;
        continue;
      }
      c.font = "13px sans-serif";
      c.fillText(SAMPLE[w] ?? "", 4, y);
      y += 18;
    }
  } else {
    c.font = "13px sans-serif";
    c.textAlign = "center";
    c.fillText(PAGES[page], 100, 90);
    c.font = "10px sans-serif";
    c.fillText("(Inhalt wie auf dem Gerät)", 100, 108);
    c.textAlign = "left";
  }
  // Seitenpunkte in der eingestellten Reihenfolge
  const on = [...d.order].map(Number).filter((p) => d.pages & (1 << p) || FIXED.includes(p));
  let x = 100 - ((on.length - 1) * 12) / 2;
  for (const p of on) {
    c.beginPath();
    c.arc(x, 194, 3, 0, Math.PI * 2);
    p === page ? c.fill() : c.stroke();
    x += 12;
  }
}

// Baut die Designer-Ansicht. v: { d (Entwurf, wird direkt geändert), preview (Seitenindex), changed(), setPreview(i),
// hint(text), actions: [Elemente unter der Vorschau] }
export function designerView(v) {
  const { d, changed, hint } = v;
  const state = { uiPreview: v.preview };
  // --- Seiten
  const pageRows = [...d.order].map((ch, i) => {
    const p = +ch;
    const fixed = FIXED.includes(p);
    const sw = el("input", { type: "checkbox", class: "form-check-input", role: "switch", id: "tk-pg" + p });
    sw.checked = fixed || !!(d.pages & (1 << p));
    sw.disabled = fixed;
    sw.addEventListener("change", () => {
      d.pages ^= 1 << p;
      changed();
    });
    return el(
      "li",
      { class: "list-group-item d-flex align-items-center gap-2 py-1" + (i === state.uiPreview ? " active" : "") },
      el("span", { class: "badge text-bg-secondary" }, String(i + 1)),
      el("div", { class: "form-check form-switch mb-0 flex-grow-1" }, sw, el("label", { class: "form-check-label", for: "tk-pg" + p }, PAGES[p] + (fixed ? " (immer an)" : ""))),
      smallBtn("fa-eye", "Vorschau", () => v.setPreview(i)),
      smallBtn("fa-arrow-up", "Nach oben", () => {
        d.order = move([...d.order], i, -1).join("");
        changed();
      }, i === 0),
      smallBtn("fa-arrow-down", "Nach unten", () => {
        d.order = move([...d.order], i, 1).join("");
        changed();
      }, i === 5),
    );
  });
  const pagesBox = group(
    "Seiten & Reihenfolge",
    hint("Die Haupttaste blättert in dieser Reihenfolge, die Zweittaste rückwärts. Lang auf der Zweittaste springt immer zur Startseite."),
    el("ul", { class: "list-group mb-0" }, ...pageRows),
  );

  // --- Startseite
  const startRows = [...d.start].map((w, i) =>
    el(
      "li",
      { class: "list-group-item d-flex align-items-center gap-2 py-1" },
      el("span", { class: "flex-grow-1" }, WIDGETS[w]),
      smallBtn("fa-arrow-up", "Nach oben", () => {
        d.start = move([...d.start], i, -1).join("");
        changed();
      }, i === 0),
      smallBtn("fa-arrow-down", "Nach unten", () => {
        d.start = move([...d.start], i, 1).join("");
        changed();
      }, i === d.start.length - 1),
      smallBtn("fa-trash", "Entfernen", () => {
        d.start = d.start.slice(0, i) + d.start.slice(i + 1);
        changed();
      }),
    ),
  );
  const unused = Object.keys(WIDGETS).filter((w) => !d.start.includes(w));
  const addSel = el("select", { class: "form-select form-select-sm", "aria-label": "Baustein hinzufügen" }, el("option", { value: "" }, "Baustein hinzufügen …"), ...unused.map((w) => el("option", { value: w }, WIDGETS[w])));
  addSel.addEventListener("change", () => {
    if (!addSel.value) return;
    d.start += addSel.value;
    changed();
  });
  const startBox = group(
    "Startseite",
    hint("Was auf der Startseite steht, von oben nach unten. Was nicht mehr auf den Bildschirm passt, wird weggelassen."),
    el("ul", { class: "list-group mb-2" }, ...(startRows.length ? startRows : [el("li", { class: "list-group-item text-muted" }, "Keine Bausteine")])),
    unused.length ? addSel : null,
  );

  // --- Schnellantworten
  const total = () => d.replies.join(";").length;
  const counter = el("div", { class: "form-text" });
  const updCounter = () => {
    const n = total();
    counter.textContent = n + " von " + MAX_REPLIES_LEN + " Zeichen";
    counter.className = "form-text" + (n > MAX_REPLIES_LEN ? " text-danger" : "");
  };
  updCounter();
  const replyRows = d.replies.map((r, i) => {
    const inp = el("input", { type: "text", class: "form-control form-control-sm", value: r, maxlength: "40", "aria-label": "Schnellantwort " + (i + 1) });
    inp.addEventListener("input", () => {
      d.replies[i] = inp.value.replace(/[;|]/g, "");
      v.typed?.();
      updCounter();
    });
    return el(
      "div",
      { class: "input-group input-group-sm mb-1" },
      inp,
      smallBtn("fa-arrow-up", "Nach oben", () => {
        d.replies = move(d.replies, i, -1);
        changed();
      }, i === 0),
      smallBtn("fa-arrow-down", "Nach unten", () => {
        d.replies = move(d.replies, i, 1);
        changed();
      }, i === d.replies.length - 1),
      smallBtn("fa-trash", "Löschen", () => {
        d.replies.splice(i, 1);
        changed();
      }),
    );
  });
  const repliesBox = group(
    "Schnellantworten",
    hint("Erscheinen auf dem Gerät unter Nachrichten → Antworten. Zeichen ; und | sind nicht erlaubt."),
    ...replyRows,
    counter,
    d.replies.length < 12
      ? el(
          "button",
          {
            type: "button",
            class: "btn btn-sm btn-outline-secondary mt-2",
            onclick: () => {
              d.replies.push("Neue Antwort");
              changed();
            },
          },
          el("i", { class: "fas fa-plus me-1" }),
          "Antwort hinzufügen",
        )
      : null,
  );

  // --- Vorschau + Speichern
  const canvas = el("canvas", { width: "400", height: "400", class: "border rounded d-block mx-auto mw-100", "aria-label": "Vorschau des Bildschirms" });
  drawPreview(canvas, d, state.uiPreview);
  const previewBox = group(
    "Vorschau",
    canvas,
    el("div", { class: "form-text text-center mb-2" }, "Seite " + (state.uiPreview + 1) + ": " + PAGES[+d.order[state.uiPreview]] + " – Beispielwerte"),
    ...(v.actions ?? []),
  );

  return el(
    "div",
    {},
    el("div", { class: "row g-3 mb-3" }, el("div", { class: "col-lg-6" }, pagesBox), el("div", { class: "col-lg-6" }, previewBox)),
    el("div", { class: "row g-3 mb-3" }, el("div", { class: "col-lg-6" }, startBox), el("div", { class: "col-lg-6" }, repliesBox)),
  );
}
