// ThinkKira Wegpunkt-Karte – eigenes ES-Modul
import { defineConfig } from "vite";
import { nodeShims } from "./src/node-shims/alias.js";

export default defineConfig({
  resolve: { alias: nodeShims },
  base: "./",
  build: {
    outDir: "dist",
    emptyOutDir: false,
    cssCodeSplit: false,
    lib: {
      entry: "src/map-main.js",
      formats: ["es"],
      fileName: () => "thinkkira-map.js",
      cssFileName: "thinkkira-map",
    },
    rollupOptions: { output: { codeSplitting: false } },
  },
});
