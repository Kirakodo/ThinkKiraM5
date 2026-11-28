// ThinkKira Designer – Bausteine für die Bildschirm-Oberfläche:
// Seiten-Reihenfolge und an/aus, Bausteine der Startseite, Schnellantworten, mit Vorschau (200×200 E-Ink).
// Design-Datei (JSON): { format: "thinkkira-design", version: 3, order, pages, start, replies[], keys, bar, menu[] }.
// Gerätebefehle auf Port 287: "ui" → "u|reihenfolge|seitenbits|bausteine|antwort;antwort;…", "ui|…" setzt.
// SPDX-License-Identifier: GPL-3.0-only
import { el, group } from "./form.js";
import { ACTIONS, DEFAULT_KEYS, DEFAULT_MENU_TEXT, HOLD_ROLES, KEY_ROLES, KEY_SLOTS, MENU_MAX_TEXT, checkKeys, cloneMenus, menuToText, parseMenu } from "./menu-model.js";

export const PAGES = ["Start", "Nachrichten", "Navigation", "Karte", "Knoten", "Einstellungen"];
const FIXED = [0, 5]; // Start und Einstellungen sind immer an
export const WIDGETS = {
  c: "Uhr (groß)",
  b: "Akku",
  t: "Ziel und Entfernung",
  g: "GPS-Status",
  s: "Letztes Signal",
  k: "Knoten online",
  n: "Ungelesene Nachrichten",
  m: "Funkmodus",
  p: "Position (Koordinaten)",
};
const SAMPLE = {
  t: "→ WP03 1,2 km",
  b: "Akku 87%",
  g: "GPS: Fix, 9 Sat.",
  s: "Signal: -92 dBm (vor 2m)",
  k: "Knoten online: 4",
  n: "Ungelesen: 2",
  m: "Funk: Meshtastic",
  p: "52.3906 N  13.0645 O",
};
// Statuszeile oben: "links|rechts", je Zeichen ein Baustein (muss zu setBar in KiraSettings.cpp passen)
export const BAR_ITEMS = {
  n: "Seitenname",
  f: "Schriftzug „ThinkKira“",
  c: "Uhrzeit",
  B: "Akku-Symbol",
  b: "Akku in %",
  g: "GPS-Symbol (voll = Position)",
  w: "WLAN-Symbol (voll = verbunden)",
  l: "Bluetooth-Symbol (Punkt = verbunden)",
  m: "Ungelesene Nachrichten (Brief)",
  k: "Knoten online",
  r: "Funkmodus (M/K)",
};
export const DEFAULT_BAR = "n|mgwlcB";
const MAX_BAR = 15;
const splitBar = (b) => {
  const [l, r = ""] = (b ?? DEFAULT_BAR).split("|");
  return [l, r];
};
export function checkBar(b) {
  if (typeof b !== "string" || b.length > MAX_BAR || b.split("|").length > 2 || [...b.replace("|", "")].some((c) => !BAR_ITEMS[c]))
    return "Die Statuszeile ist ungültig.";
  return null;
}
const MAX_REPLIES_LEN = 169;
export const MAX_LEN = 169;
export const DEFAULT_UI = {
  order: "012345",
  pages: 63,
  start: "cbtgsknm",
  replies: ["OK", "Ja", "Nein", "Bin unterwegs", "Komme gleich", "Alles gut", "Wo bist du?", "Brauche Hilfe"],
  keys: DEFAULT_KEYS,
  bar: DEFAULT_BAR,
  menus: parseMenu(DEFAULT_MENU_TEXT),
};

// "u|…"-Antwort vom Gerät lesen
export function parseUi(fields) {
  const [order, pages, start, replies, keys, bar] = fields;
  return { order, pages: +pages, start: start ?? "", replies: (replies ?? "").split(";").filter(Boolean), keys: keys || DEFAULT_KEYS, bar: bar || DEFAULT_BAR };
}

export function uiCommand(d) {
  return ["ui", d.order, String(d.pages | 0x21), d.start, d.replies.join(";"), d.keys, d.bar ?? DEFAULT_BAR].join("|");
}

// Befehle, um das Menü in Stücken zu übertragen (eine Nachricht höchstens ~230 Byte)
export function menuCommands(menus) {
  const t = menuToText(menus);
  const cmds = ["mb"];
  for (let i = 0; i < t.length; i += 200) cmds.push("ml|" + t.slice(i, i + 200));
  cmds.push("me");
  return cmds;
}

export const copy = (u) => ({
  order: u.order,
  pages: u.pages,
  start: u.start,
  replies: [...u.replies],
  keys: u.keys ?? DEFAULT_KEYS,
  bar: u.bar ?? DEFAULT_BAR,
  menus: cloneMenus(u.menus ?? DEFAULT_UI.menus),
});

export function designJson(d) {
  const c = copy(d);
  return { format: "thinkkira-design", version: 3, order: c.order, pages: c.pages, start: c.start, replies: c.replies, keys: c.keys, bar: c.bar, menu: menuToText(c.menus).split("\n").filter(Boolean) };
}

export function exportDesign(d, name = "thinkkira-design.json") {
  const json = JSON.stringify(designJson(d), null, 2);
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
  const keys = j.keys ?? DEFAULT_KEYS;
  const kErr = checkKeys(keys);
  if (kErr) throw new Error(kErr);
  const menus = j.menu ? parseMenu(Array.isArray(j.menu) ? j.menu.join("\n") : j.menu) : parseMenu(DEFAULT_MENU_TEXT);
  const bar = j.bar ?? DEFAULT_BAR;
  const bErr = checkBar(bar);
  if (bErr) throw new Error(bErr);
  return { order, pages: (+j.pages & 63) | 0x21, start, replies, keys, bar, menus };
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
  const kErr = checkKeys(d.keys);
  if (kErr) return kErr;
  const bErr = checkBar(d.bar ?? DEFAULT_BAR);
  if (bErr) return bErr;
  if (!d.menus[5].length) return "Das Menü der Einstellungen darf nicht leer sein.";
  if (d.menus.some((m) => m.some((e) => e.sub && !e.sub.length))) return "Ein Untermenü ist leer. Bitte Einträge hinzufügen oder es löschen.";
  if (menuToText(d.menus).length > MENU_MAX_TEXT) return "Die Menüs sind zu groß. Bitte Einträge entfernen.";
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
function shownLabel(e) {
  if (e.sub) return e.label || "Untermenü";
  return e.label || ACTIONS[e.action][1];
}

function drawPreview(canvas, d, pageIdx, menu) {
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
  drawBar(c, d.bar ?? DEFAULT_BAR, page === 0 ? "ThinkKira" : PAGES[page]);
  c.beginPath();
  c.moveTo(0, 14.5);
  c.lineTo(200, 14.5);
  c.stroke();
  let y = 20;
  if (menu) {
    const items = d.menus[page];
    c.font = "13px sans-serif";
    c.textBaseline = "middle";
    items.slice(0, 8).forEach((e, i) => {
      const yy = 16 + i * 22;
      if (i === 0) {
        c.fillRect(0, yy, 200, 22);
        c.fillStyle = "#fff";
      }
      c.fillText(shownLabel(e) + (e.sub ? "  ›" : ""), 6, yy + 11);
      c.fillStyle = "#000";
    });
    if (!items.length) c.fillText("(kein Menü)", 6, 30);
    return;
  }
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

// Statuszeile wie auf dem Gerät (Beispielwerte: GPS mit Position, WLAN verbunden, Bluetooth an, 2 ungelesen)
function drawBar(c, bar, title) {
  const [left, right] = splitBar(bar);
  const item = (ch, x, fromRight) => {
    const L = (w) => (fromRight ? x - w : x);
    const text = (t) => {
      const w = c.measureText(t).width;
      c.fillText(t, L(w), 3);
      return w;
    };
    const cy = 7;
    switch (ch) {
      case "n":
        return text(title);
      case "f":
        return text("ThinkKira");
      case "c":
        return text("12:34");
      case "b":
        return text("87%");
      case "k":
        return text("4K");
      case "r":
        return text("M");
      case "B": {
        const l = L(16);
        c.strokeRect(l + 0.5, cy - 3.5, 13, 7);
        c.fillRect(l + 14, cy - 1.5, 2, 3);
        c.fillRect(l + 2, cy - 1.5, 9, 4);
        return 16;
      }
      case "g": {
        const l = L(7);
        c.beginPath();
        c.arc(l + 3.5, cy - 1.5, 3, 0, Math.PI * 2);
        c.fill();
        c.beginPath();
        c.moveTo(l + 0.5, cy);
        c.lineTo(l + 6.5, cy);
        c.lineTo(l + 3.5, cy + 5.5);
        c.fill();
        return 7;
      }
      case "w": {
        const l = L(10);
        for (let i = 0; i < 3; i++) c.fillRect(l + i * 4, cy + 5 - (4 + 3 * i), 2, 4 + 3 * i);
        return 10;
      }
      case "l": {
        const l = L(7),
          m = l + 3.5,
          t = cy - 5;
        c.beginPath();
        c.moveTo(m, t);
        c.lineTo(m, t + 10);
        c.lineTo(m + 3, t + 7);
        c.lineTo(l, t + 3);
        c.moveTo(m, t);
        c.lineTo(m + 3, t + 3);
        c.lineTo(l, t + 7);
        c.stroke();
        return 7;
      }
      case "m": {
        const l = L(10 + 2 + c.measureText("2").width);
        c.strokeRect(l + 0.5, cy - 3.5, 9, 7);
        c.beginPath();
        c.moveTo(l + 0.5, cy - 3.5);
        c.lineTo(l + 5, cy);
        c.lineTo(l + 9.5, cy - 3.5);
        c.stroke();
        c.fillText("2", l + 12, 3);
        return 12 + c.measureText("2").width;
      }
    }
    return 0;
  };
  let x = 2;
  for (const ch of left) x += item(ch, x, false) + 4;
  let r = 198;
  for (const ch of [...right].reverse()) r -= item(ch, r, true) + 4;
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
    hint("Mit „Weiter“ blätterst du in dieser Reihenfolge, mit „Zurück“ rückwärts (Tasten siehe unten)."),
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

  // --- Statuszeile
  const [bl, br] = splitBar(d.bar);
  const setBar = (l, r) => {
    d.bar = l + "|" + r;
    changed();
  };
  const barRows = (side) => {
    const str = side === 0 ? bl : br;
    const put = (s2) => (side === 0 ? setBar(s2, br) : setBar(bl, s2));
    return [...str].map((ch, i) =>
      el(
        "li",
        { class: "list-group-item d-flex align-items-center gap-2 py-1" },
        el("span", { class: "flex-grow-1" }, BAR_ITEMS[ch]),
        smallBtn("fa-arrow-up", "Nach vorne", () => put(move([...str], i, -1).join("")), i === 0),
        smallBtn("fa-arrow-down", "Nach hinten", () => put(move([...str], i, 1).join("")), i === str.length - 1),
        smallBtn("fa-exchange-alt", side === 0 ? "Nach rechts" : "Nach links", () =>
          side === 0 ? setBar(bl.slice(0, i) + bl.slice(i + 1), ch + br) : setBar(bl + ch, br.slice(0, i) + br.slice(i + 1)),
        ),
        smallBtn("fa-trash", "Entfernen", () => put(str.slice(0, i) + str.slice(i + 1))),
      ),
    );
  };
  const barUnused = Object.keys(BAR_ITEMS).filter((ch) => !d.bar.includes(ch));
  const barAdd = el(
    "select",
    { class: "form-select form-select-sm", "aria-label": "Statuszeile: hinzufügen" },
    el("option", { value: "" }, "Hinzufügen (rechts) …"),
    ...barUnused.map((ch) => el("option", { value: ch }, BAR_ITEMS[ch])),
  );
  barAdd.addEventListener("change", () => {
    if (!barAdd.value) return;
    setBar(bl, br + barAdd.value);
  });
  const emptyRow = el("li", { class: "list-group-item text-muted py-1" }, "leer");
  const barBox = group(
    "Statuszeile oben",
    hint("Steht auf jeder Seite ganz oben. Symbole erscheinen nur, wenn die Funktion eingeschaltet ist (z. B. WLAN aus = kein WLAN-Symbol)."),
    el("div", { class: "small fw-semibold mb-1" }, "Links"),
    el("ul", { class: "list-group mb-2" }, ...(bl ? barRows(0) : [emptyRow.cloneNode(true)])),
    el("div", { class: "small fw-semibold mb-1" }, "Rechts"),
    el("ul", { class: "list-group mb-2" }, ...(br ? barRows(1) : [emptyRow.cloneNode(true)])),
    barUnused.length && d.bar.length < MAX_BAR ? barAdd : null,
    el("div", {}, smallBtn("fa-undo", "Standard", () => ((d.bar = DEFAULT_BAR), changed()))),
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

  // --- Menüs (je Seite, 2 Ebenen)
  const mp = +d.order[state.uiPreview]; // Seite, deren Menü bearbeitet wird = Seite in der Vorschau
  const list = d.menus[mp];
  const actionSelect = (value, onchange, label) => {
    const sel = el("select", { class: "form-select form-select-sm", "aria-label": label });
    for (const [id, [name]] of Object.entries(ACTIONS)) sel.append(el("option", { value: id }, name));
    sel.value = value;
    sel.addEventListener("change", () => onchange(sel.value));
    return sel;
  };
  const labelInput = (e, placeholder, label) => {
    const inp = el("input", { type: "text", class: "form-control form-control-sm", value: e.label ?? "", placeholder, maxlength: "28", "aria-label": label });
    inp.addEventListener("input", () => {
      e.label = inp.value.replace(/[|\n]/g, "");
      v.typed?.();
    });
    return inp;
  };
  const entryRow = (arr, i, level) => {
    const e = arr[i];
    const ctrls = [
      smallBtn("fa-arrow-up", "Nach oben", () => {
        arr.splice(i - 1, 0, ...arr.splice(i, 1));
        changed();
      }, i === 0),
      smallBtn("fa-arrow-down", "Nach unten", () => {
        arr.splice(i + 1, 0, ...arr.splice(i, 1));
        changed();
      }, i === arr.length - 1),
      smallBtn("fa-trash", "Löschen", () => {
        arr.splice(i, 1);
        changed();
      }),
    ];
    if (e.sub) {
      return el(
        "li",
        { class: "list-group-item py-2" },
        el("div", { class: "input-group input-group-sm mb-2" }, el("span", { class: "input-group-text" }, el("i", { class: "fas fa-folder" })), labelInput(e, "Untermenü", "Name des Untermenüs"), ...ctrls),
        el("ul", { class: "list-group ms-4" }, ...e.sub.map((_, j) => entryRow(e.sub, j, 2))),
        addControls(e.sub, 2),
      );
    }
    const def = ACTIONS[e.action][1];
    return el(
      "li",
      { class: "list-group-item py-1" },
      el(
        "div",
        { class: "input-group input-group-sm" },
        labelInput(e, def === e.action ? ACTIONS[e.action][0] : def + " (automatisch)", "Text des Eintrags"),
        actionSelect(e.action, (a) => {
          e.action = a;
          changed();
        }, "Aktion"),
        ...ctrls,
      ),
    );
  };
  function addControls(arr, level) {
    const kids = [
      el(
        "button",
        { type: "button", class: "btn btn-sm btn-outline-secondary me-2 mt-1", onclick: () => {
          arr.push({ action: "pos.send", label: "" });
          changed();
        } },
        el("i", { class: "fas fa-plus me-1" }),
        "Eintrag",
      ),
    ];
    if (level === 1)
      kids.push(
        el(
          "button",
          { type: "button", class: "btn btn-sm btn-outline-secondary mt-1", onclick: () => {
            arr.push({ label: "Neues Untermenü", sub: [{ action: "sys.info", label: "" }] });
            changed();
          } },
          el("i", { class: "fas fa-folder-plus me-1" }),
          "Untermenü",
        ),
      );
    return el("div", { class: level === 2 ? "ms-4" : "" }, ...kids);
  }
  const menuBox = group(
    "Menü der Seite „" + PAGES[mp] + "“",
    hint("Gilt für die Seite in der Vorschau (Auge-Symbol links wählt die Seite). Leerer Text = Standardtext; Schalter zeigen dann automatisch ihren Zustand. Höchstens 2 Ebenen."),
    el("ul", { class: "list-group mb-2" }, ...(list.length ? list.map((_, i) => entryRow(list, i, 1)) : [el("li", { class: "list-group-item text-muted" }, "Kein Menü – langes Drücken zeigt dann einen Hinweis")])),
    addControls(list, 1),
  );

  // --- Tasten
  const keyRows = KEY_SLOTS.map((name, i) => {
    const roles = i < 4 ? KEY_ROLES : HOLD_ROLES;
    const sel = el("select", { class: "form-select form-select-sm", id: "tk-key" + i });
    for (const [c, t] of Object.entries(roles)) sel.append(el("option", { value: c }, t));
    sel.value = d.keys[i];
    sel.addEventListener("change", () => {
      d.keys = d.keys.slice(0, i) + sel.value + d.keys.slice(i + 1);
      changed();
    });
    return el("div", { class: "row g-2 align-items-center mb-1" }, el("label", { class: "col-6 col-form-label col-form-label-sm", for: "tk-key" + i }, name), el("div", { class: "col-6" }, sel));
  });
  const kErr = checkKeys(d.keys);
  const keysBox = group(
    "Tasten",
    hint("Auf den Seiten und in den Menüs gleich: Weiter = nächste Seite bzw. nächster Eintrag, Zurück = vorige Seite bzw. eine Ebene zurück."),
    ...keyRows,
    kErr ? el("div", { class: "alert alert-danger py-1 px-2 mt-2 mb-0 small" }, kErr) : null,
  );

  // --- Vorschau + Speichern
  const canvas = el("canvas", { width: "400", height: "400", class: "border rounded d-block mx-auto mw-100", "aria-label": "Vorschau des Bildschirms" });
  drawPreview(canvas, d, state.uiPreview, v.previewMenu);
  const previewBox = group(
    "Vorschau",
    canvas,
    el("div", { class: "form-text text-center mb-2" }, "Seite " + (state.uiPreview + 1) + ": " + PAGES[+d.order[state.uiPreview]] + (v.previewMenu ? " – Menü" : " – Beispielwerte")),
    el(
      "div",
      { class: "btn-group btn-group-sm d-flex mb-1", role: "group" },
      el("button", { type: "button", class: "btn " + (v.previewMenu ? "btn-outline-secondary" : "btn-secondary"), onclick: () => v.setPreviewMenu(false) }, "Seite"),
      el("button", { type: "button", class: "btn " + (v.previewMenu ? "btn-secondary" : "btn-outline-secondary"), onclick: () => v.setPreviewMenu(true) }, "Menü"),
    ),
    ...(v.actions ?? []),
  );

  return el(
    "div",
    {},
    el("div", { class: "row g-3 mb-3" }, el("div", { class: "col-lg-6" }, pagesBox), el("div", { class: "col-lg-6" }, previewBox)),
    el("div", { class: "row g-3 mb-3" }, el("div", { class: "col-lg-6" }, menuBox), el("div", { class: "col-lg-6" }, keysBox)),
    el("div", { class: "row g-3 mb-3" }, el("div", { class: "col-lg-6" }, startBox), el("div", { class: "col-lg-6" }, barBox)),
    el("div", { class: "row g-3 mb-3" }, el("div", { class: "col-lg-6" }, repliesBox)),
  );
}
