// ThinkKira Loader – Firmware aus dem neuesten GitHub-Release per USB aufspielen,
// komplettes Geräte-Backup (Flash-Abbild) sichern und zurückspielen. Komplett auf Deutsch.
// Einbettung: <div id="tk-loader" data-firmware="/pfad/zu/firmware.php"></div> + dieses Modul + CSS.
// SPDX-License-Identifier: GPL-3.0-only
import "./shim.js";
import "./loader.css";
import { ESPLoader, Transport } from "esptool-js";
import { el, fehlerText, deFehler } from "./form.js";
import { readBootInfo, readRuntimeInfo } from "./deviceinfo.js";

let root, fw, manifest;
let busy = false;
const ui = {};
const SIZES = { "2MB": 2, "4MB": 4, "8MB": 8, "16MB": 16, "32MB": 32 };
const READ_CHUNK = 0x40000; // 256 KB je Lesevorgang

function setStatus(text, kind = "") {
  // kind: "" (Info), "ok" (fertig), "bad" (Fehler)
  const cls = { ok: "alert alert-success", bad: "alert alert-danger" }[kind] || "text-muted";
  ui.status.className = "mt-3 mb-0 " + cls;
  ui.status.textContent = text;
}
function setProgress(pct, done = false) {
  ui.progress.classList.toggle("d-none", pct <= 0);
  ui.bar.className = done ? "progress-bar bg-success" : "progress-bar progress-bar-striped progress-bar-animated";
  ui.bar.style.width = pct + "%";
  ui.bar.textContent = pct + " %";
  ui.progress.setAttribute("aria-valuenow", String(pct));
}
function setBusy(b) {
  busy = b;
  const usb = "serial" in navigator;
  ui.btn.disabled = b || !usb || !manifest;
  ui.backup.disabled = b || !usb;
  ui.restore.disabled = b || !usb;
  ui.read.disabled = b || !usb;
}

// ---------- Geräte-Infos anzeigen ----------
let lastInfo = [];
function showInfo(sections, append = false) {
  lastInfo = append ? lastInfo.concat(sections) : sections;
  const cards = lastInfo.map(([title, rows]) =>
    el(
      "div",
      { class: "col-lg-6" },
      el(
        "fieldset",
        { class: "border rounded p-3 h-100" },
        el("legend", { class: "float-none w-auto px-1 fs-6 fw-bold" }, title),
        el(
          "table",
          { class: "table table-sm mb-0" },
          el("tbody", {}, ...rows.map(([k, v]) => el("tr", {}, el("th", { class: "fw-normal text-muted w-50" }, k), el("td", {}, v)))),
        ),
      ),
    ),
  );
  const save = el("button", { type: "button", class: "btn btn-sm btn-outline-secondary mt-3", onclick: saveInfo }, el("i", { class: "fas fa-file-download me-1" }), "Infos als Datei speichern");
  ui.info.replaceChildren(el("h6", { class: "fw-bold mt-4" }, "Geräte-Infos"), el("div", { class: "row g-3" }, ...cards), save);
}
function saveInfo() {
  const lines = ["ThinkKira – Geräte-Infos (" + new Date().toLocaleString("de-DE") + ")", ""];
  for (const [title, rows] of lastInfo) {
    lines.push("== " + title + " ==");
    for (const [k, v] of rows) lines.push(k + ": " + v);
    lines.push("");
  }
  download(new TextEncoder().encode(lines.join("\n")), "thinkkira-geraeteinfo.txt");
}

async function loadManifest() {
  try {
    const r = await fetch(fw + "?asset=manifest.json", { cache: "no-store" });
    manifest = await r.json();
    ui.version.textContent = manifest.version;
    if (manifest.release_url) ui.gh.href = manifest.release_url;
  } catch {
    ui.version.textContent = "nicht erreichbar";
    setStatus("Das neueste Release konnte nicht geladen werden. Backup geht trotzdem.", "bad");
  }
  setBusy(busy);
}

// Port wählen, mit dem ESP32-S3 im Bootmodus verbinden. Gibt { loader, transport } zurück.
async function connect() {
  setStatus("Port auswählen …");
  const port = await navigator.serial.requestPort();
  setStatus("Verbinde mit dem Gerät …");
  const transport = new Transport(port, false);
  const loader = new ESPLoader({
    transport,
    baudrate: 921600,
    terminal: { clean() {}, write() {}, writeLine() {} },
  });
  try {
    const chip = await loader.main();
    if (!/ESP32-S3/i.test(chip)) throw deFehler("Falscher Chip: " + chip + " (erwartet ESP32-S3)");
  } catch (e) {
    await transport.disconnect().catch(() => {});
    throw e;
  }
  return { loader, transport, port };
}

function errorText(e) {
  console.error(e);
  return "Fehler: " + fehlerText(e);
}

async function run(task) {
  if (busy) return;
  setBusy(true);
  setProgress(0);
  let conn;
  try {
    await task((c) => (conn = c));
  } catch (e) {
    setStatus(errorText(e), "bad");
  } finally {
    await conn?.transport?.disconnect().catch(() => {});
    setBusy(false);
  }
}

async function writeImage(loader, data, address, erase) {
  if (erase) {
    setStatus("Gerät wird komplett gelöscht (ca. 20 s) …");
    await loader.eraseFlash();
  }
  setStatus("Wird geschrieben …");
  await loader.writeFlash({
    fileArray: [{ data, address }],
    flashSize: "keep",
    flashMode: "keep",
    flashFreq: "keep",
    eraseAll: false,
    compress: true,
    reportProgress: (_i, written, total) => setProgress(Math.round((written / total) * 100)),
  });
  setStatus("Neustart …");
  await loader.after();
  setProgress(100, true);
}

function install() {
  const part = manifest?.builds?.[0]?.parts?.[0];
  if (!part) return;
  run(async (keep) => {
    setStatus("Firmware wird geladen …");
    const url = new URL(part.path, new URL(fw + "?asset=manifest.json", location.href)).href;
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw deFehler("Download fehlgeschlagen (" + res.status + ")");
    const data = new Uint8Array(await res.arrayBuffer());
    const { loader } = keep(await connect());
    setStatus("Lese Geräte-Infos vor dem Update …");
    showInfo((await readBootInfo(loader)).sections);
    await writeImage(loader, data, part.offset ?? 0, ui.erase.checked);
    setStatus("Fertig! ThinkKira " + manifest.version + " ist installiert. Das Gerät startet neu.", "ok");
  });
}

function download(data, name) {
  const url = URL.createObjectURL(new Blob([data], { type: "application/octet-stream" }));
  const a = el("a", { href: url, download: name });
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 10000);
}

function backup() {
  run(async (keep) => {
    const { loader } = keep(await connect());
    setStatus("Lese Geräte-Infos …");
    const bi = await readBootInfo(loader);
    showInfo(bi.sections);
    const sizeStr = bi.flashSize || "4MB";
    const total = (SIZES[sizeStr] || 4) * 1024 * 1024;
    const image = new Uint8Array(total);
    setStatus("Backup wird gelesen (" + sizeStr.replace("MB", " MB") + ", ca. 1–2 Minuten) …");
    for (let addr = 0; addr < total; addr += READ_CHUNK) {
      const len = Math.min(READ_CHUNK, total - addr);
      image.set(await loader.readFlash(addr, len), addr);
      setProgress(Math.round(((addr + len) / total) * 100));
    }
    await loader.after();
    setProgress(100, true);
    const stamp = new Date().toISOString().slice(0, 16).replace(/[:T]/g, "-");
    download(image, "thinkkira-backup-" + stamp + ".bin");
    setStatus("Backup gespeichert (" + sizeStr.replace("MB", " MB") + "). Die Datei enthält Firmware, Einstellungen, Knoten und Schlüssel – sicher aufbewahren!", "ok");
  });
}

function readDevice() {
  run(async (keep) => {
    const conn = keep(await connect());
    setStatus("Lese Chip, Speicher und installierte Firmware …");
    setProgress(30);
    showInfo((await readBootInfo(conn.loader)).sections);
    setProgress(50);
    await conn.loader.after(); // Neustart in die Firmware
    await conn.transport.disconnect().catch(() => {});
    keep(null);
    const rt = await readRuntimeInfo(conn.port, (t) => setStatus(t));
    setProgress(100, true);
    if (rt) {
      showInfo(rt, true);
      setStatus("Gerät ausgelesen. Nichts wurde verändert.", "ok");
    } else {
      showInfo([["Laufende Firmware", [["Status", "keine Antwort – keine Meshtastic-/ThinkKira-Firmware aktiv"]]]], true);
      setStatus("Chip und Speicher ausgelesen. Die Firmware hat nicht geantwortet (leer oder fremde Firmware). Nichts wurde verändert.", "ok");
    }
  });
}

function restore() {
  ui.file.value = "";
  ui.file.click();
}

function restoreFile() {
  const f = ui.file.files?.[0];
  if (!f) return;
  run(async (keep) => {
    const data = new Uint8Array(await f.arrayBuffer());
    if (data.length < 0x10000 || data.length % 0x1000) throw deFehler("Die Datei ist kein vollständiges Backup.");
    const { loader } = keep(await connect());
    await writeImage(loader, data, 0, false);
    setStatus("Backup „" + f.name + "“ wurde zurückgespielt. Das Gerät startet neu.", "ok");
  });
}

export function mount(target = "#tk-loader") {
  root = typeof target === "string" ? document.querySelector(target) : target;
  if (!root) return;
  fw = root.dataset.firmware || window.TK_FIRMWARE_PHP || "firmware.php";
  root.classList.add("tk-loader");

  const icon = (n) => el("i", { class: "fas fa-" + n + " me-1" });
  ui.version = el("strong", {}, "wird geladen …");
  ui.gh = el("a", { href: "https://github.com/Kirakodo/ThinkKiraM5/releases/latest", target: "_blank", rel: "noopener" }, "GitHub");
  ui.erase = el("input", { type: "checkbox", id: "tk-erase", class: "form-check-input" });
  ui.erase.checked = true;
  ui.btn = el("button", { type: "button", class: "btn btn-primary", onclick: install }, icon("download"), "Installieren / Aktualisieren");
  ui.backup = el("button", { type: "button", class: "btn btn-outline-secondary", onclick: backup }, icon("save"), "Backup erstellen");
  ui.read = el("button", { type: "button", class: "btn btn-outline-secondary", onclick: readDevice }, icon("info-circle"), "Gerät auslesen");
  ui.info = el("div");
  ui.restore = el("button", { type: "button", class: "btn btn-outline-secondary", onclick: restore }, icon("upload"), "Backup zurückspielen");
  ui.file = el("input", { type: "file", accept: ".bin", class: "d-none", onchange: restoreFile });
  ui.status = el("p", { class: "mt-3 mb-0 text-muted", role: "status" });
  ui.bar = el("div", { class: "progress-bar", style: "width:0%" });
  ui.progress = el("div", { class: "progress mt-3 d-none", role: "progressbar", "aria-valuemin": "0", "aria-valuemax": "100", "aria-valuenow": "0" }, ui.bar);

  const kids = [
    !("serial" in navigator)
      ? el("div", { class: "alert alert-warning" }, icon("exclamation-triangle"), "Dieser Browser kann keine USB-Geräte ansprechen. Bitte Chrome oder Edge am PC nutzen.")
      : null,
    el("p", { class: "text-muted" }, "aktuelle Version ", ui.version, " · ", ui.gh),
    el(
      "ol",
      {},
      el("li", {}, "Chrome oder Edge am PC verwenden."),
      el("li", {}, "ThinkNode M5 per USB-C anschließen."),
      el("li", {}, "Vor dem ersten Aufspielen am besten „Backup erstellen“."),
      el("li", {}, "„Installieren / Aktualisieren“ klicken und den Port wählen."),
    ),
    el(
      "div",
      { class: "form-check mb-3" },
      ui.erase,
      el("label", { class: "form-check-label", for: "tk-erase" }, "Gerät vorher komplett löschen (empfohlen beim ersten Mal, löscht alle Einstellungen)"),
    ),
    el("div", { class: "d-flex flex-wrap gap-2" }, ui.btn, ui.read, ui.backup, ui.restore),
    el(
      "p",
      { class: "form-text mb-0 mt-2" },
      "„Gerät auslesen“ zeigt Chip, Speicher, installierte Firmware und Einstellungen, ohne etwas zu ändern. Das Backup ist ein komplettes Abbild des Geräts (Firmware, Einstellungen, Knoten, Schlüssel) als .bin-Datei. Zurückspielen stellt genau diesen Stand wieder her.",
    ),
    ui.file,
    ui.progress,
    ui.status,
    ui.info,
  ];
  root.replaceChildren(...kids.filter(Boolean));
  setBusy(false);
  loadManifest();
}

if (typeof document !== "undefined") {
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", () => mount());
  else mount();
}
