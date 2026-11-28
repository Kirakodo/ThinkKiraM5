// Gemeinsame Vite-Aliase: Node-Module durch kleine Browser-Ersatzmodule ersetzen.
import { fileURLToPath } from "node:url";
const shim = (n) => fileURLToPath(new URL("./" + n + ".js", import.meta.url));
export const nodeShims = { os: shim("os"), path: shim("path"), util: shim("util") };
