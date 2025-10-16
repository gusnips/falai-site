import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteStaticCopy } from "vite-plugin-static-copy";

// https://vite.dev/config/
export default defineConfig({
  server: {
    open: true,
    port: 9999,
  },
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: "node_modules/@falai/agent/docs/*",
          dest: "content/docs",
        },
        {
          src: "node_modules/@falai/agent/examples/*",
          dest: "content/examples",
        },
        {
          src: "node_modules/@falai/agent/README.md",
          dest: "content",
        },
      ],
    }),
  ],
});
