// ThinkKira Loader – eigenes ES-Modul + CSS
import { defineConfig } from "vite";

export default defineConfig({
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
