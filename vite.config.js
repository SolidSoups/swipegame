import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "SwipeGame",
        short_name: "Swipe",
        start_url: "/",
        display: "standalone",
        background_color: "#111",
        theme_color: "#111",
        icons: [
          { src: "/icon-192.jpg", sizes: "192x192", type: "image/jpeg" },
          { src: "/icon-512.jpg", sizes: "512x512", type: "image/jpeg" },
        ],
      },
    }),
  ],
});
