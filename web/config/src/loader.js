// ThinkKira Loader – Firmware aus dem neuesten GitHub-Release per USB aufspielen (komplett auf Deutsch).
// Einbettung: <div id="tk-loader" data-firmware="/pfad/zu/firmware.php"></div> + dieses Modul + CSS.
// SPDX-License-Identifier: GPL-3.0-only
import "./shim.js";
import "./loader.css";
import { ESPLoader, Transport } from "esptool-js";
import { el } from "./form.js";

let root, fw, manifest;
const ui = {};

function setStatus(text, kind = "") {
  ui.status.textContent = text;
  ui.status.className = "tk-ldstatus" + (kind ? " tk-" + kind : "");
}
function setProgress(pct) {
  ui.bar.style.width = pct + "%";
  ui.pct.textContent = pct > 0 ? pct + " %" : "";
}

async function loadManifest() {
  try {
    const r = await fetch(fw + "?asset=manifest.json", { cache: "no-store" });
    manifest = await r.json();
    ui.version.textContent = manifest.version;
    ui.btn.disabled = !("serial" in navigator);
  } catch {
    ui.version.textContent = "nicht erreichbar";
    setStatus("Das neueste Release konnte nicht geladen werden. Bitte später erneut versuchen.", "bad");
  }
}

async function install() {
  const part = manifest?.builds?.[0]?.parts?.[0];
  if (!part) return;
  ui.btn.disabled = true;
  setProgress(0);
  let transport;
  try {
    setStatus("Port auswählen …");
    const port = await navigator.serial.requestPort();

    setStatus("Firmware wird geladen …");
    const url = new URL(part.path, new URL(fw + "?asset=manifest.json", location.href)).href;
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error("Download fehlgeschlagen (" + res.status + ")");
    const data = new Uint8Array(await res.arrayBuffer());

    setStatus("Verbinde mit dem Gerät …");
    transport = new Transport(port, false);
    const loader = new ESPLoader({
      transport,
      baudrate: 921600,
      terminal: { clean() {}, write() {}, writeLine() {} },
    });
    const chip = await loader.main();
    if (!/ESP32-S3/i.test(chip)) throw new Error("Falscher Chip: " + chip + " (erwartet ESP32-S3)");

    const erase = ui.erase.checked;
    if (erase) {
      setStatus("Gerät wird komplett gelöscht (ca. 20 s) …");
      await loader.eraseFlash();
    }

    setStatus("Firmware wird geschrieben …");
    await loader.writeFlash({
      fileArray: [{ data, address: part.offset ?? 0 }],
      flashSize: "keep",
      flashMode: "keep",
      flashFreq: "keep",
      eraseAll: false,
      compress: true,
      reportProgress: (_i, written, total) => setProgress(Math.round((written / total) * 100)),
    });

    setStatus("Neustart …");
    await loader.after();
    setProgress(100);
    setStatus("Fertig! ThinkKira " + manifest.version + " ist installiert. Das Gerät startet neu.", "ok");
  } catch (e) {
    console.error(e);
    const msg = e?.name === "NotFoundError" ? "Kein Port ausgewählt." : (e?.message ?? String(e));
    setStatus("Fehler: " + msg + " – Kabel neu stecken und erneut versuchen.", "bad");
  } finally {
    try {
      await transport?.disconnect();
    } catch {}
    ui.btn.disabled = false;
  }
}

export function mount(target = "#tk-loader") {
  root = typeof target === "string" ? document.querySelector(target) : target;
  if (!root) return;
  fw = root.dataset.firmware || window.TK_FIRMWARE_PHP || "firmware.php";
  root.classList.add("tk-loader");

  ui.version = el("strong", {}, "wird geladen …");
  ui.erase = el("input", { type: "checkbox", id: "tk-erase" });
  ui.erase.checked = true;
  ui.btn = el("button", { class: "tk-btn", disabled: "", onclick: install }, "Firmware installieren");
  ui.status = el("p", { class: "tk-ldstatus" });
  ui.bar = el("div", { class: "tk-barfill" });
  ui.pct = el("span", { class: "tk-pct" });

  const kids = [
    el("p", {}, "Neueste Version: ", ui.version),
    el(
      "ol",
      {},
      el("li", {}, "Chrome oder Edge am PC verwenden."),
      el("li", {}, "ThinkNode M5 per USB-C anschließen."),
      el("li", {}, "„Firmware installieren“ klicken und den Port wählen."),
    ),
    el("label", { class: "tk-check", for: "tk-erase" }, ui.erase, " Gerät vorher komplett löschen (empfohlen beim ersten Mal, löscht alle Einstellungen)"),
    ui.btn,
    el("div", { class: "tk-bar" }, ui.bar),
    ui.pct,
    ui.status,
    !("serial" in navigator) ? el("p", { class: "tk-ldstatus tk-bad" }, "Dieser Browser kann keine USB-Geräte ansprechen. Bitte Chrome oder Edge am PC nutzen.") : null,
  ];
  root.replaceChildren(...kids.filter(Boolean));
  loadManifest();
}

if (typeof document !== "undefined") {
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", () => mount());
  else mount();
}
