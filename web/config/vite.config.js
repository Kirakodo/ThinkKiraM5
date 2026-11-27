// ThinkKira Konfigurator – Build als einzelnes ES-Modul + CSS für die Einbettung in eine PHP-Seite
import { defineConfig } from "vite";

export default defineConfig({
  base: "./",
  build: {
    outDir: "dist",
    emptyOutDir: true,
    cssCodeSplit: false,
    lib: {
      entry: "src/main.js",
      formats: ["es"],
      fileName: () => "thinkkira-config.js",
      cssFileName: "thinkkira-config",
    },
    rollupOptions: { output: { codeSplitting: false } },
  },
});
