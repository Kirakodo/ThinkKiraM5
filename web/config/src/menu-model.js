// ThinkKira – Menü-Daten für Designer und Konfigurator (muss zu src/custom/core/KiraMenu.cpp passen).
// SPDX-License-Identifier: GPL-3.0-only

// Aktion → [Name im Designer, Text auf dem Gerät, wenn kein eigener Text gesetzt ist]
export const ACTIONS = {
  "pos.send": ["Position senden", "Position senden"],
  "light.toggle": ["Licht: immer an ↔ bei Taste", "Licht: bei Taste"],
  "light.cycle": ["Licht: aus / bei Taste / immer", "Licht: bei Taste"],
  "sound.toggle": ["Töne an/aus", "Töne: an"],
  "leds.toggle": ["LED-Hinweise an/aus", "LED-Hinweise: an"],
  "screen.off": ["Bildschirm aus", "Bildschirm aus"],
  "msg.reply": ["Auf letzte Nachricht antworten", "msg.reply"],
  "msg.new": ["Neue Nachricht an alle", "msg.new"],
  "msg.chats": ["Alle Chats anzeigen", "msg.chats"],
  "msg.clear": ["Nachrichten löschen", "msg.clear"],
  "nav.goto": ["Navigieren zu … (Wegpunkt/Knoten)", "nav.goto"],
  "nav.wpsave": ["Wegpunkt hier speichern", "nav.wpsave"],
  "wp.manage": ["Wegpunkte verwalten", "wp.manage"],
  "nav.stop": ["Navigation beenden", "nav.stop"],
  "nav.track": ["Track starten/stoppen", "Track starten"],
  "track.clear": ["Track löschen", "track.clear"],
  "map.offline": ["Offline-Karte (kommt bald)", "map.offline"],
  "nodes.list": ["Knotenliste (mit Knoten-Menü)", "nodes.list"],
  ping: ["Reichweitentest (Ping)", "ping"],
  "radio.mode": ["Funkmodus wechseln", "Zu Kira-Funk wechseln"],
  "radio.stats": ["Funk-Statistik", "radio.stats"],
  pages: ["Seiten ein/aus", "pages"],
  "bt.toggle": ["Bluetooth an/aus", "Bluetooth aus (Neustart)"],
  wifi: ["WLAN & Web (Phase 5)", "wifi"],
  "sys.info": ["System-Info", "sys.info"],
  "sys.reboot": ["Neustart", "sys.reboot"],
  "sys.off": ["Ausschalten", "sys.off"],
  home: ["Zur Startseite", "Zur Startseite"],
  sos: ["SOS auslösen", "SOS auslösen"],
};

export const DEFAULT_MENU_TEXT = `P0
Ipos.send|Position senden
Ilight.toggle|
Isound.toggle|
Iscreen.off|Bildschirm aus
P1
Imsg.reply|Antworten
Imsg.new|Neue Nachricht (alle)
Imsg.chats|Alle Chats
Imsg.clear|Löschen
P2
Inav.goto|Navigieren zu …
Inav.wpsave|Wegpunkt hier speichern
Iwp.manage|Wegpunkte verwalten
Inav.stop|Navigation beenden
Inav.track|
Ipos.send|Position senden
P3
Imap.offline|Offline-Karte
P4
Inodes.list|Knoten wählen …
Iping|Reichweitentest (Ping)
P5
SFunk
Iradio.mode|
Iradio.stats|Statistik
Iping|Reichweitentest (Ping)
E
SAnzeige & Töne
Ilight.cycle|
Ileds.toggle|
Isound.toggle|
Ipages|Seiten ein/aus
E
SVerbindungen
Ibt.toggle|
Iwifi|WLAN & Web
E
SSystem
Isys.info|Info
Isys.reboot|Neustart
Isys.off|Ausschalten
E
`;

export const MENU_MAX_TEXT = 3000;

// Text → [6 Listen]; Eintrag { action, label } oder Untermenü { label, sub: [...] }
export function parseMenu(text) {
  const menus = [[], [], [], [], [], []];
  let page = -1,
    sub = null;
  String(text)
    .split("\n")
    .forEach((raw, i) => {
      const line = raw.replace(/\r$/, "");
      if (!line) return;
      const k = line[0],
        rest = line.slice(1);
      const fail = (t) => {
        throw new Error("Menü, Zeile " + (i + 1) + ": " + t);
      };
      if (k === "P") {
        page = +rest;
        if (!(page >= 0 && page < 6) || rest === "") fail("ungültige Seite");
        sub = null;
      } else if (page < 0) fail("Eintrag ohne Seite");
      else if (k === "I") {
        const bar = rest.indexOf("|");
        const e = { action: bar < 0 ? rest : rest.slice(0, bar), label: bar < 0 ? "" : rest.slice(bar + 1) };
        if (!ACTIONS[e.action]) fail("unbekannte Aktion " + e.action);
        (sub ? sub.sub : menus[page]).push(e);
      } else if (k === "S") {
        if (sub) fail("höchstens 2 Menü-Ebenen");
        sub = { label: rest || "Untermenü", sub: [] };
        menus[page].push(sub);
      } else if (k === "E") sub = null;
      else fail("unbekannter Zeilentyp");
    });
  if (!menus[5].length) throw new Error("Das Menü der Einstellungen darf nicht leer sein.");
  return menus;
}

const clean = (t) => String(t ?? "").replace(/[\n\r|]/g, "").trim();

export function menuToText(menus) {
  let t = "";
  menus.forEach((m, p) => {
    t += "P" + p + "\n";
    for (const e of m) {
      if (e.sub) {
        t += "S" + (clean(e.label) || "Untermenü") + "\n";
        for (const s of e.sub) t += "I" + s.action + "|" + (clean(s.label) || (ACTIONS[s.action][1] === s.action ? ACTIONS[s.action][0] : "")) + "\n";
        t += "E\n";
      } else t += "I" + e.action + "|" + (clean(e.label) || (ACTIONS[e.action][1] === e.action ? ACTIONS[e.action][0] : "")) + "\n";
    }
  });
  return t;
}

export const cloneMenus = (m) => m.map((page) => page.map((e) => (e.sub ? { label: e.label, sub: e.sub.map((s) => ({ ...s })) } : { ...e })));

// Tastenbelegung: 6 Zeichen [Haupt kurz, Haupt lang, Zweit kurz, Zweit lang, Haupt 4 s, Zweit 3 s]
export const DEFAULT_KEYS = "nmphos";
export const KEY_SLOTS = ["Haupttaste kurz", "Haupttaste lang (0,5 s)", "Zweittaste kurz", "Zweittaste lang (0,5 s)", "Haupttaste 4 s halten", "Zweittaste 3 s halten"];
export const KEY_ROLES = { n: "Weiter / nächster Eintrag", p: "Zurück / eine Ebene zurück", m: "Menü öffnen / auswählen", h: "Zur Startseite", l: "Licht an/aus", x: "nichts" };
export const HOLD_ROLES = { o: "Ausschalten", s: "SOS (5 s Countdown)", x: "nichts" };

export function checkKeys(k) {
  if (typeof k !== "string" || k.length !== 6) return "Tastenbelegung ungültig.";
  if ([...k.slice(0, 4)].some((c) => !KEY_ROLES[c]) || [...k.slice(4)].some((c) => !HOLD_ROLES[c])) return "Tastenbelegung ungültig.";
  if (!k.slice(0, 4).includes("m")) return "„Menü öffnen / auswählen“ muss auf einer Taste liegen.";
  if (!k.slice(0, 4).includes("n")) return "„Weiter / nächster Eintrag“ muss auf einer Taste liegen.";
  return null;
}
