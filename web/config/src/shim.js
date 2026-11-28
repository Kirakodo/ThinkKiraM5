// Einige Meshtastic-Bibliotheken erwarten Node.js-Globals (der eingebaute Logger nutzt z. B.
// Buffer.isBuffer). Im Browser reicht ein kleiner Ersatz.
if (typeof globalThis.process === "undefined") {
  globalThis.process = { env: {}, versions: {}, platform: "browser", cwd: () => "/" };
}
if (typeof globalThis.Buffer === "undefined") {
  globalThis.Buffer = { isBuffer: () => false };
}
