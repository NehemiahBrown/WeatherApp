import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Weather Dashboard",
        short_name: "Weather",
        description: "Weather dashboard built with React",
        theme_color: "#3a3d3a",
        background_color: "#3a3d3a",
        display: "standalone",
        orientation: "portrait",
        start_url: "/",

        icons: [
          {
            src: "/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
