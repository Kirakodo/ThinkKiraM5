// Einige Meshtastic-Bibliotheken erwarten Node.js-Globals. Im Browser reicht ein leerer Ersatz.
if (typeof globalThis.process === "undefined") {
  globalThis.process = { env: {}, versions: {}, platform: "browser", cwd: () => "/" };
}
