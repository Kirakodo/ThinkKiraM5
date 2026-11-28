// ThinkKira Loader – eigenes ES-Modul + CSS
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
      entry: "src/loader.js",
      formats: ["es"],
      fileName: () => "thinkkira-loader.js",
      cssFileName: "thinkkira-loader",
    },
    rollupOptions: { output: { codeSplitting: false } },
  },
});
