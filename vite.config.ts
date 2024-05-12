import { defineConfig } from "vitest/config";
import { VitePWA } from "vite-plugin-pwa";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA({
    registerType: "prompt",
    includeAssets: ["logo.ico", "logo.png"],
    manifest: {
      name: "React pokemons",
      short_name: "pokemons",
      description: "React pokemons app",
      theme_color: "#ffffff",
      start_url: "/",
      icons: [
        {
          src: "logo.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "logo.png",
          sizes: "512x512",
          type: "image/png",
        },
        {
          src: "logo.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any maskable",
        },
      ],
    },
  })],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "tests/setup.tsx",
    css: true,
  },
});
