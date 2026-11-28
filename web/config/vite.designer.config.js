// ThinkKira Designer – eigenes ES-Modul (ohne Gerät nutzbar)
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
      entry: "src/designer-main.js",
      formats: ["es"],
      fileName: () => "thinkkira-designer.js",
      cssFileName: "thinkkira-designer",
    },
    rollupOptions: { output: { codeSplitting: false } },
  },
});
