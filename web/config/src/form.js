// Erzeugt aus einem Protobuf-Schema (bufbuild v2) automatisch ein Formular.
// So deckt der Configurator alle Meshtastic-Einstellungen ab, auch neue nach Updates.
import { ScalarType, create } from "@bufbuild/protobuf";
import { humanize, enumLabel } from "./labels.js";

const INT64 = new Set([ScalarType.INT64, ScalarType.UINT64, ScalarType.FIXED64, ScalarType.SFIXED64, ScalarType.SINT64]);
const FLOATS = new Set([ScalarType.FLOAT, ScalarType.DOUBLE]);
const SECRET = /psk|password|privateKey/i;

const el = (tag, attrs = {}, ...kids) => {
  const e = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === "class") e.className = v;
    else if (k.startsWith("on")) e.addEventListener(k.slice(2), v);
    else if (v !== undefined && v !== null) e.setAttribute(k, v);
  }
  for (const k of kids) if (k !== null && k !== undefined) e.append(k);
  return e;
};
export { el };

export function b64(bytes) {
  let s = "";
  for (const b of bytes ?? []) s += String.fromCharCode(b);
  return btoa(s);
}
export function unb64(text) {
  const s = atob(text.trim());
  return Uint8Array.from(s, (c) => c.charCodeAt(0));
}

function scalarInput(field, scalar, get, set) {
  const id = "tk-" + Math.random().toString(36).slice(2);
  let input;
  if (scalar === ScalarType.BOOL) {
    input = el("input", { type: "checkbox", id });
    input.checked = !!get();
    input.addEventListener("change", () => set(input.checked));
  } else if (scalar === ScalarType.STRING) {
    input = el("input", { type: SECRET.test(field.localName) ? "password" : "text", id });
    input.value = get() ?? "";
    input.addEventListener("input", () => set(input.value));
  } else if (scalar === ScalarType.BYTES) {
    input = el("input", { type: SECRET.test(field.localName) ? "password" : "text", id, placeholder: "Schlüssel (Base64)" });
    input.value = b64(get());
    input.addEventListener("change", () => {
      try {
        set(unb64(input.value));
        input.classList.remove("tk-bad");
      } catch {
        input.classList.add("tk-bad");
      }
    });
  } else {
    input = el("input", { type: "number", id, step: FLOATS.has(scalar) ? "any" : "1" });
    input.value = String(get() ?? 0);
    input.addEventListener("input", () => {
      if (input.value === "") return;
      if (INT64.has(scalar)) set(BigInt(input.value));
      else set(FLOATS.has(scalar) ? parseFloat(input.value) : parseInt(input.value, 10));
    });
  }
  return { input, id };
}

function enumInput(enumDesc, get, set) {
  const id = "tk-" + Math.random().toString(36).slice(2);
  const sel = el("select", { id });
  for (const v of enumDesc.values) {
    const o = el("option", { value: String(v.number) }, enumLabel(v));
    sel.append(o);
  }
  sel.value = String(get() ?? 0);
  sel.addEventListener("change", () => set(parseInt(sel.value, 10)));
  return { input: sel, id };
}

function row(label, input, id, hint) {
  return el("div", { class: "tk-row" }, el("label", { for: id }, label), input, hint ? el("small", {}, hint) : null);
}

// msg: Nachrichten-Objekt (wird direkt verändert), schema: DescMessage
export function renderMessage(schema, msg, opts = {}) {
  const box = el("div", { class: "tk-form" });
  for (const field of schema.fields) {
    if (field.deprecated) continue;
    if (opts.skip?.includes(field.localName)) continue;
    const label = humanize(field.localName);
    const get = () => msg[field.localName];
    const set = (v) => {
      msg[field.localName] = v;
      opts.onChange?.();
    };

    if (field.oneof) continue; // in Config-Untertypen nicht genutzt

    switch (field.fieldKind) {
      case "scalar": {
        const { input, id } = scalarInput(field, field.scalar, get, set);
        box.append(row(label, input, id));
        break;
      }
      case "enum": {
        const { input, id } = enumInput(field.enum, get, set);
        box.append(row(label, input, id));
        break;
      }
      case "message": {
        if (!msg[field.localName]) msg[field.localName] = create(field.message);
        const fs = el("fieldset", { class: "tk-sub" }, el("legend", {}, label));
        fs.append(renderMessage(field.message, msg[field.localName], opts));
        box.append(fs);
        break;
      }
      case "list": {
        if (field.listKind === "message") break; // z. B. Remote-Hardware-Pins: hier nicht bearbeitbar
        const id = "tk-" + Math.random().toString(36).slice(2);
        const ta = el("textarea", { id, rows: "2", placeholder: "ein Wert pro Zeile" });
        const toText = (v) => (field.scalar === ScalarType.BYTES ? b64(v) : String(v));
        ta.value = (get() ?? []).map(toText).join("\n");
        ta.addEventListener("change", () => {
          const lines = ta.value.split("\n").map((s) => s.trim()).filter(Boolean);
          let vals;
          if (field.listKind === "enum") vals = lines.map((s) => parseInt(s, 10));
          else if (field.scalar === ScalarType.BYTES) vals = lines.map(unb64);
          else if (field.scalar === ScalarType.STRING) vals = lines;
          else if (INT64.has(field.scalar)) vals = lines.map((s) => BigInt(s));
          else vals = lines.map(Number);
          set(vals);
        });
        box.append(row(label, ta, id, "ein Wert pro Zeile"));
        break;
      }
      default:
        break;
    }
  }
  return box;
}
