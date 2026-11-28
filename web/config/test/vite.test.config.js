import { defineConfig } from "vite";
import { nodeShims } from "../src/node-shims/alias.js";
export default defineConfig({
  resolve: { alias: nodeShims },
  build: {
    outDir: process.env.TK_TEST_OUT,
    emptyOutDir: true,
    lib: { entry: "test/harness.js", formats: ["es"], fileName: () => "harness.js" },
  },
});
