// node_modules/@bufbuild/protobuf/dist/esm/descriptors.js
var e;
(function(e) {
	e[e.DOUBLE = 1] = "DOUBLE", e[e.FLOAT = 2] = "FLOAT", e[e.INT64 = 3] = "INT64", e[e.UINT64 = 4] = "UINT64", e[e.INT32 = 5] = "INT32", e[e.FIXED64 = 6] = "FIXED64", e[e.FIXED32 = 7] = "FIXED32", e[e.BOOL = 8] = "BOOL", e[e.STRING = 9] = "STRING", e[e.BYTES = 12] = "BYTES", e[e.UINT32 = 13] = "UINT32", e[e.SFIXED32 = 15] = "SFIXED32", e[e.SFIXED64 = 16] = "SFIXED64", e[e.SINT32 = 17] = "SINT32", e[e.SINT64 = 18] = "SINT64";
})(e ||= {}), e.INT64, e.UINT64, e.FIXED64, e.SFIXED64, e.SINT64, e.FLOAT, e.DOUBLE;
var t = (e, t = {}, ...n) => {
	let r = document.createElement(e);
	for (let [e, n] of Object.entries(t)) e === "class" ? r.className = n : e.startsWith("on") ? r.addEventListener(e.slice(2), n) : n != null && r.setAttribute(e, n);
	for (let e of n) e != null && r.append(e);
	return r;
};
function n(e, ...n) {
	return t("fieldset", { class: "border rounded p-3 h-100" }, t("legend", { class: "float-none w-auto px-1 fs-6 fw-bold" }, e), ...n);
}
// src/menu-model.js
var r = {
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
	"nav.goto": ["Navigieren zu … (Phase 4)", "nav.goto"],
	"nav.wpsave": ["Wegpunkt speichern (Phase 4)", "nav.wpsave"],
	"nav.track": ["Track Start/Stopp (Phase 4)", "nav.track"],
	"map.offline": ["Offline-Karte (Phase 4)", "map.offline"],
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
	sos: ["SOS auslösen", "SOS auslösen"]
}, i = "P0\nIpos.send|Position senden\nIlight.toggle|\nIsound.toggle|\nIscreen.off|Bildschirm aus\nP1\nImsg.reply|Antworten\nImsg.new|Neue Nachricht (alle)\nImsg.chats|Alle Chats\nImsg.clear|Löschen\nP2\nIpos.send|Position senden\nInav.goto|Navigieren zu …\nInav.wpsave|Wegpunkt speichern\nInav.track|Track Start/Stopp\nP3\nImap.offline|Offline-Karte\nP4\nInodes.list|Knoten wählen …\nIping|Reichweitentest (Ping)\nP5\nSFunk\nIradio.mode|\nIradio.stats|Statistik\nIping|Reichweitentest (Ping)\nE\nSAnzeige & Töne\nIlight.cycle|\nIleds.toggle|\nIsound.toggle|\nIpages|Seiten ein/aus\nE\nSVerbindungen\nIbt.toggle|\nIwifi|WLAN & Web\nE\nSSystem\nIsys.info|Info\nIsys.reboot|Neustart\nIsys.off|Ausschalten\nE\n";
function a(e) {
	let t = [
		[],
		[],
		[],
		[],
		[],
		[]
	], n = -1, i = null;
	if (String(e).split("\n").forEach((e, a) => {
		let o = e.replace(/\r$/, "");
		if (!o) return;
		let s = o[0], c = o.slice(1), l = (e) => {
			throw Error("Menü, Zeile " + (a + 1) + ": " + e);
		};
		if (s === "P") n = +c, n >= 0 && n < 6 && c !== "" || l("ungültige Seite"), i = null;
		else if (n < 0) l("Eintrag ohne Seite");
		else if (s === "I") {
			let e = c.indexOf("|"), a = {
				action: e < 0 ? c : c.slice(0, e),
				label: e < 0 ? "" : c.slice(e + 1)
			};
			r[a.action] || l("unbekannte Aktion " + a.action), (i ? i.sub : t[n]).push(a);
		} else s === "S" ? (i && l("höchstens 2 Menü-Ebenen"), i = {
			label: c || "Untermenü",
			sub: []
		}, t[n].push(i)) : s === "E" ? i = null : l("unbekannter Zeilentyp");
	}), !t[5].length) throw Error("Das Menü der Einstellungen darf nicht leer sein.");
	return t;
}
var o = (e) => String(e ?? "").replace(/[\n\r|]/g, "").trim();
function s(e) {
	let t = "";
	return e.forEach((e, n) => {
		t += "P" + n + "\n";
		for (let n of e) if (n.sub) {
			t += "S" + (o(n.label) || "Untermenü") + "\n";
			for (let e of n.sub) t += "I" + e.action + "|" + (o(e.label) || (r[e.action][1] === e.action ? r[e.action][0] : "")) + "\n";
			t += "E\n";
		} else t += "I" + n.action + "|" + (o(n.label) || (r[n.action][1] === n.action ? r[n.action][0] : "")) + "\n";
	}), t;
}
var c = (e) => e.map((e) => e.map((e) => e.sub ? {
	label: e.label,
	sub: e.sub.map((e) => ({ ...e }))
} : { ...e })), l = "nmphos", u = [
	"Haupttaste kurz",
	"Haupttaste lang (0,5 s)",
	"Zweittaste kurz",
	"Zweittaste lang (0,5 s)",
	"Haupttaste 4 s halten",
	"Zweittaste 3 s halten"
], d = {
	n: "Weiter / nächster Eintrag",
	p: "Zurück / eine Ebene zurück",
	m: "Menü öffnen / auswählen",
	h: "Zur Startseite",
	l: "Licht an/aus",
	x: "nichts"
}, f = {
	o: "Ausschalten",
	s: "SOS (5 s Countdown)",
	x: "nichts"
};
function p(e) {
	return typeof e != "string" || e.length !== 6 || [...e.slice(0, 4)].some((e) => !d[e]) || [...e.slice(4)].some((e) => !f[e]) ? "Tastenbelegung ungültig." : e.slice(0, 4).includes("m") ? e.slice(0, 4).includes("n") ? null : "„Weiter / nächster Eintrag“ muss auf einer Taste liegen." : "„Menü öffnen / auswählen“ muss auf einer Taste liegen.";
}
// src/designer.js
var m = [
	"Start",
	"Nachrichten",
	"Navigation",
	"Karte",
	"Knoten",
	"Einstellungen"
], h = [0, 5], g = {
	c: "Uhr (groß)",
	b: "Akku",
	g: "GPS-Status",
	s: "Letztes Signal",
	k: "Knoten online",
	n: "Ungelesene Nachrichten",
	m: "Funkmodus",
	p: "Position (Koordinaten)"
}, _ = {
	b: "Akku 87%",
	g: "GPS: Fix, 9 Sat.",
	s: "Signal: -92 dBm (vor 2m)",
	k: "Knoten online: 4",
	n: "Ungelesen: 2",
	m: "Funk: Meshtastic",
	p: "52.3906 N  13.0645 O"
}, v = 169, y = {
	order: "012345",
	pages: 63,
	start: "cbgsknm",
	replies: [
		"OK",
		"Ja",
		"Nein",
		"Bin unterwegs",
		"Komme gleich",
		"Alles gut",
		"Wo bist du?",
		"Brauche Hilfe"
	],
	keys: l,
	menus: a(i)
}, b = (e) => ({
	order: e.order,
	pages: e.pages,
	start: e.start,
	replies: [...e.replies],
	keys: e.keys ?? "nmphos",
	menus: c(e.menus ?? y.menus)
});
function x(e) {
	let t = b(e);
	return {
		format: "thinkkira-design",
		version: 2,
		order: t.order,
		pages: t.pages,
		start: t.start,
		replies: t.replies,
		keys: t.keys,
		menu: s(t.menus).split("\n").filter(Boolean)
	};
}
function S(e, n = "thinkkira-design.json") {
	let r = JSON.stringify(x(e), null, 2), i = t("a", {
		href: URL.createObjectURL(new Blob([r], { type: "application/json" })),
		download: n
	});
	i.click(), setTimeout(() => URL.revokeObjectURL(i.href), 1e3);
}
function C(e) {
	let t;
	try {
		t = JSON.parse(e);
	} catch {
		throw Error("Die Datei ist keine gültige Design-Datei (kein JSON).");
	}
	if (t?.format !== "thinkkira-design") throw Error("Das ist keine ThinkKira-Design-Datei.");
	let n = String(t.order ?? "");
	if (n.length !== 6 || [...n].sort().join("") !== "012345") throw Error("Die Seiten-Reihenfolge in der Datei ist ungültig.");
	let r = String(t.start ?? "");
	if (r.length > 11 || [...r].some((e) => !g[e])) throw Error("Die Startseiten-Bausteine in der Datei sind ungültig.");
	let o = (Array.isArray(t.replies) ? t.replies : []).map((e) => String(e).replace(/[;|\n]/g, "").trim()).filter(Boolean);
	if (!o.length || o.join(";").length > v) throw Error("Die Schnellantworten in der Datei fehlen oder sind zu lang.");
	let s = t.keys ?? "nmphos", c = p(s);
	if (c) throw Error(c);
	let l = t.menu ? a(Array.isArray(t.menu) ? t.menu.join("\n") : t.menu) : a(i);
	return {
		order: n,
		pages: t.pages & 63 | 33,
		start: r,
		replies: o,
		keys: s,
		menus: l
	};
}
function w(e = ".json,application/json") {
	return new Promise((n) => {
		let r = t("input", {
			type: "file",
			accept: e
		});
		r.addEventListener("change", () => n(r.files[0] ?? null)), r.click();
	});
}
function T(e) {
	return e.replies = e.replies.map((e) => e.trim()).filter(Boolean), e.replies.length ? e.replies.join(";").length > v ? "Die Schnellantworten sind zusammen zu lang. Bitte kürzen." : p(e.keys) || (e.menus[5].length ? e.menus.some((e) => e.some((e) => e.sub && !e.sub.length)) ? "Ein Untermenü ist leer. Bitte Einträge hinzufügen oder es löschen." : s(e.menus).length > 3e3 ? "Die Menüs sind zu groß. Bitte Einträge entfernen." : null : "Das Menü der Einstellungen darf nicht leer sein.") : "Mindestens eine Schnellantwort wird gebraucht.";
}
var E = (e, t, n) => {
	let r = t + n;
	if (r < 0 || r >= e.length) return e;
	let i = [...e];
	return [i[t], i[r]] = [i[r], i[t]], i;
}, D = (e, n, r, i) => t("button", {
	type: "button",
	class: "btn btn-sm btn-outline-secondary",
	title: n,
	"aria-label": n,
	onclick: r,
	disabled: i ? "" : null
}, t("i", { class: "fas " + e }));
function O(e) {
	return e.sub ? e.label || "Untermenü" : e.label || r[e.action][1];
}
function k(e, t, n, r) {
	let i = e.getContext("2d");
	i.setTransform(2, 0, 0, 2, 0, 0), i.fillStyle = "#fff", i.fillRect(0, 0, 200, 200), i.fillStyle = "#000", i.strokeStyle = "#000", i.lineWidth = 1, i.textBaseline = "top";
	let a = +t.order[n];
	i.font = "9px sans-serif", i.fillText(a === 0 ? "ThinkKira" : m[a], 2, 2), i.textAlign = "right", i.fillText("12:34  87%", 198, 2), i.textAlign = "left", i.beginPath(), i.moveTo(0, 14.5), i.lineTo(200, 14.5), i.stroke();
	let o = 20;
	if (r) {
		let e = t.menus[a];
		i.font = "13px sans-serif", i.textBaseline = "middle", e.slice(0, 8).forEach((e, t) => {
			let n = 16 + t * 22;
			t === 0 && (i.fillRect(0, n, 200, 22), i.fillStyle = "#fff"), i.fillText(O(e) + (e.sub ? "  ›" : ""), 6, n + 11), i.fillStyle = "#000";
		}), e.length || i.fillText("(kein Menü)", 6, 30);
		return;
	}
	if (a === 0) for (let e of t.start) {
		if (o > 184) break;
		e === "c" ? (i.font = "bold 34px sans-serif", i.textAlign = "center", i.fillText("12:34", 100, o), i.textAlign = "left", o += 42) : (i.font = "13px sans-serif", i.fillText(_[e] ?? "", 4, o), o += 18);
	}
	else i.font = "13px sans-serif", i.textAlign = "center", i.fillText(m[a], 100, 90), i.font = "10px sans-serif", i.fillText("(Inhalt wie auf dem Gerät)", 100, 108), i.textAlign = "left";
	let s = [...t.order].map(Number).filter((e) => t.pages & 1 << e || h.includes(e)), c = 100 - (s.length - 1) * 12 / 2;
	for (let e of s) i.beginPath(), i.arc(c, 194, 3, 0, Math.PI * 2), e === a ? i.fill() : i.stroke(), c += 12;
}
function A(e) {
	let { d: i, changed: a, hint: o } = e, s = { uiPreview: e.preview }, c = [...i.order].map((n, r) => {
		let o = +n, c = h.includes(o), l = t("input", {
			type: "checkbox",
			class: "form-check-input",
			role: "switch",
			id: "tk-pg" + o
		});
		return l.checked = c || !!(i.pages & 1 << o), l.disabled = c, l.addEventListener("change", () => {
			i.pages ^= 1 << o, a();
		}), t("li", { class: "list-group-item d-flex align-items-center gap-2 py-1" + (r === s.uiPreview ? " active" : "") }, t("span", { class: "badge text-bg-secondary" }, String(r + 1)), t("div", { class: "form-check form-switch mb-0 flex-grow-1" }, l, t("label", {
			class: "form-check-label",
			for: "tk-pg" + o
		}, m[o] + (c ? " (immer an)" : ""))), D("fa-eye", "Vorschau", () => e.setPreview(r)), D("fa-arrow-up", "Nach oben", () => {
			i.order = E([...i.order], r, -1).join(""), a();
		}, r === 0), D("fa-arrow-down", "Nach unten", () => {
			i.order = E([...i.order], r, 1).join(""), a();
		}, r === 5));
	}), l = n("Seiten & Reihenfolge", o("Mit „Weiter“ blätterst du in dieser Reihenfolge, mit „Zurück“ rückwärts (Tasten siehe unten)."), t("ul", { class: "list-group mb-0" }, ...c)), _ = [...i.start].map((e, n) => t("li", { class: "list-group-item d-flex align-items-center gap-2 py-1" }, t("span", { class: "flex-grow-1" }, g[e]), D("fa-arrow-up", "Nach oben", () => {
		i.start = E([...i.start], n, -1).join(""), a();
	}, n === 0), D("fa-arrow-down", "Nach unten", () => {
		i.start = E([...i.start], n, 1).join(""), a();
	}, n === i.start.length - 1), D("fa-trash", "Entfernen", () => {
		i.start = i.start.slice(0, n) + i.start.slice(n + 1), a();
	}))), y = Object.keys(g).filter((e) => !i.start.includes(e)), b = t("select", {
		class: "form-select form-select-sm",
		"aria-label": "Baustein hinzufügen"
	}, t("option", { value: "" }, "Baustein hinzufügen …"), ...y.map((e) => t("option", { value: e }, g[e])));
	b.addEventListener("change", () => {
		b.value && (i.start += b.value, a());
	});
	let x = n("Startseite", o("Was auf der Startseite steht, von oben nach unten. Was nicht mehr auf den Bildschirm passt, wird weggelassen."), t("ul", { class: "list-group mb-2" }, ..._.length ? _ : [t("li", { class: "list-group-item text-muted" }, "Keine Bausteine")]), y.length ? b : null), S = () => i.replies.join(";").length, C = t("div", { class: "form-text" }), w = () => {
		let e = S();
		C.textContent = e + " von 169 Zeichen", C.className = "form-text" + (e > v ? " text-danger" : "");
	};
	w();
	let T = i.replies.map((n, r) => {
		let o = t("input", {
			type: "text",
			class: "form-control form-control-sm",
			value: n,
			maxlength: "40",
			"aria-label": "Schnellantwort " + (r + 1)
		});
		return o.addEventListener("input", () => {
			i.replies[r] = o.value.replace(/[;|]/g, ""), e.typed?.(), w();
		}), t("div", { class: "input-group input-group-sm mb-1" }, o, D("fa-arrow-up", "Nach oben", () => {
			i.replies = E(i.replies, r, -1), a();
		}, r === 0), D("fa-arrow-down", "Nach unten", () => {
			i.replies = E(i.replies, r, 1), a();
		}, r === i.replies.length - 1), D("fa-trash", "Löschen", () => {
			i.replies.splice(r, 1), a();
		}));
	}), O = n("Schnellantworten", o("Erscheinen auf dem Gerät unter Nachrichten → Antworten. Zeichen ; und | sind nicht erlaubt."), ...T, C, i.replies.length < 12 ? t("button", {
		type: "button",
		class: "btn btn-sm btn-outline-secondary mt-2",
		onclick: () => {
			i.replies.push("Neue Antwort"), a();
		}
	}, t("i", { class: "fas fa-plus me-1" }), "Antwort hinzufügen") : null), A = +i.order[s.uiPreview], j = i.menus[A], M = (e, n, i) => {
		let a = t("select", {
			class: "form-select form-select-sm",
			"aria-label": i
		});
		for (let [e, [n]] of Object.entries(r)) a.append(t("option", { value: e }, n));
		return a.value = e, a.addEventListener("change", () => n(a.value)), a;
	}, N = (n, r, i) => {
		let a = t("input", {
			type: "text",
			class: "form-control form-control-sm",
			value: n.label ?? "",
			placeholder: r,
			maxlength: "28",
			"aria-label": i
		});
		return a.addEventListener("input", () => {
			n.label = a.value.replace(/[|\n]/g, ""), e.typed?.();
		}), a;
	}, P = (e, n, i) => {
		let o = e[n], s = [
			D("fa-arrow-up", "Nach oben", () => {
				e.splice(n - 1, 0, ...e.splice(n, 1)), a();
			}, n === 0),
			D("fa-arrow-down", "Nach unten", () => {
				e.splice(n + 1, 0, ...e.splice(n, 1)), a();
			}, n === e.length - 1),
			D("fa-trash", "Löschen", () => {
				e.splice(n, 1), a();
			})
		];
		if (o.sub) return t("li", { class: "list-group-item py-2" }, t("div", { class: "input-group input-group-sm mb-2" }, t("span", { class: "input-group-text" }, t("i", { class: "fas fa-folder" })), N(o, "Untermenü", "Name des Untermenüs"), ...s), t("ul", { class: "list-group ms-4" }, ...o.sub.map((e, t) => P(o.sub, t, 2))), F(o.sub, 2));
		let c = r[o.action][1];
		return t("li", { class: "list-group-item py-1" }, t("div", { class: "input-group input-group-sm" }, N(o, c === o.action ? r[o.action][0] : c + " (automatisch)", "Text des Eintrags"), M(o.action, (e) => {
			o.action = e, a();
		}, "Aktion"), ...s));
	};
	function F(e, n) {
		let r = [t("button", {
			type: "button",
			class: "btn btn-sm btn-outline-secondary me-2 mt-1",
			onclick: () => {
				e.push({
					action: "pos.send",
					label: ""
				}), a();
			}
		}, t("i", { class: "fas fa-plus me-1" }), "Eintrag")];
		return n === 1 && r.push(t("button", {
			type: "button",
			class: "btn btn-sm btn-outline-secondary mt-1",
			onclick: () => {
				e.push({
					label: "Neues Untermenü",
					sub: [{
						action: "sys.info",
						label: ""
					}]
				}), a();
			}
		}, t("i", { class: "fas fa-folder-plus me-1" }), "Untermenü")), t("div", { class: n === 2 ? "ms-4" : "" }, ...r);
	}
	let I = n("Menü der Seite „" + m[A] + "“", o("Gilt für die Seite in der Vorschau (Auge-Symbol links wählt die Seite). Leerer Text = Standardtext; Schalter zeigen dann automatisch ihren Zustand. Höchstens 2 Ebenen."), t("ul", { class: "list-group mb-2" }, ...j.length ? j.map((e, t) => P(j, t, 1)) : [t("li", { class: "list-group-item text-muted" }, "Kein Menü – langes Drücken zeigt dann einen Hinweis")]), F(j, 1)), L = u.map((e, n) => {
		let r = n < 4 ? d : f, o = t("select", {
			class: "form-select form-select-sm",
			id: "tk-key" + n
		});
		for (let [e, n] of Object.entries(r)) o.append(t("option", { value: e }, n));
		return o.value = i.keys[n], o.addEventListener("change", () => {
			i.keys = i.keys.slice(0, n) + o.value + i.keys.slice(n + 1), a();
		}), t("div", { class: "row g-2 align-items-center mb-1" }, t("label", {
			class: "col-6 col-form-label col-form-label-sm",
			for: "tk-key" + n
		}, e), t("div", { class: "col-6" }, o));
	}), R = p(i.keys), z = n("Tasten", o("Auf den Seiten und in den Menüs gleich: Weiter = nächste Seite bzw. nächster Eintrag, Zurück = vorige Seite bzw. eine Ebene zurück."), ...L, R ? t("div", { class: "alert alert-danger py-1 px-2 mt-2 mb-0 small" }, R) : null), B = t("canvas", {
		width: "400",
		height: "400",
		class: "border rounded d-block mx-auto mw-100",
		"aria-label": "Vorschau des Bildschirms"
	});
	k(B, i, s.uiPreview, e.previewMenu);
	let V = n("Vorschau", B, t("div", { class: "form-text text-center mb-2" }, "Seite " + (s.uiPreview + 1) + ": " + m[+i.order[s.uiPreview]] + (e.previewMenu ? " – Menü" : " – Beispielwerte")), t("div", {
		class: "btn-group btn-group-sm d-flex mb-1",
		role: "group"
	}, t("button", {
		type: "button",
		class: "btn " + (e.previewMenu ? "btn-outline-secondary" : "btn-secondary"),
		onclick: () => e.setPreviewMenu(!1)
	}, "Seite"), t("button", {
		type: "button",
		class: "btn " + (e.previewMenu ? "btn-secondary" : "btn-outline-secondary"),
		onclick: () => e.setPreviewMenu(!0)
	}, "Menü")), ...e.actions ?? []);
	return t("div", {}, t("div", { class: "row g-3 mb-3" }, t("div", { class: "col-lg-6" }, l), t("div", { class: "col-lg-6" }, V)), t("div", { class: "row g-3 mb-3" }, t("div", { class: "col-lg-6" }, I), t("div", { class: "col-lg-6" }, z)), t("div", { class: "row g-3 mb-3" }, t("div", { class: "col-lg-6" }, x), t("div", { class: "col-lg-6" }, O)));
}
// src/designer-main.js
var j = "thinkkira-design", M, N, P = 0, F = !1, I;
function L() {
	try {
		let e = localStorage.getItem(j);
		if (e) return C(e);
	} catch {}
	return b(y);
}
function R() {
	try {
		localStorage.setItem(j, JSON.stringify(x(N)));
	} catch {}
}
function z(e, n = !1) {
	let r = M.querySelector(".tk-msg");
	r.replaceChildren(t("div", { class: "alert py-2 mb-3 " + (n ? "alert-danger" : "alert-success") }, e)), clearTimeout(I), I = setTimeout(() => r.replaceChildren(), 5e3);
}
var B = (e, n, r, i) => t("button", {
	type: "button",
	class: "btn btn-sm btn-" + r + " me-2 mt-2",
	onclick: i
}, t("i", { class: "fas " + n + " me-1" }), e);
function V() {
	let e = A({
		d: N,
		preview: P,
		hint: (e) => t("div", { class: "form-text mb-2" }, e),
		changed: () => {
			R(), V();
		},
		typed: R,
		setPreview: (e) => {
			P = e, V();
		},
		previewMenu: F,
		setPreviewMenu: (e) => {
			F = e, V();
		},
		actions: [
			B("Design exportieren", "fa-download", "primary", () => {
				let e = T(N);
				if (e) return z(e, !0);
				R(), S(N), z("Design-Datei gespeichert. Übertragen: Konfigurator → ThinkKira → „Design übertragen“.");
			}),
			B("Design importieren", "fa-upload", "outline-secondary", async () => {
				let e = await w();
				if (e) try {
					N = C(await e.text()), P = 0, R(), V(), z("Design „" + e.name + "“ geladen.");
				} catch (e) {
					z(e.message, !0);
				}
			}),
			B("Standard", "fa-magic", "outline-secondary", () => {
				N = b(y), P = 0, R(), V();
			})
		]
	});
	M.replaceChildren(t("p", { class: "text-muted" }, "Hier stellst du die Oberfläche des ThinkKira ein – ganz ohne Gerät. Der Entwurf bleibt in diesem Browser gespeichert."), t("div", { class: "tk-msg" }), e);
}
function H() {
	M = document.getElementById("tk-designer"), M && (N = L(), V());
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", H) : H();
