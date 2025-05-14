import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        assetFileNames: "assets/[name].[hash].[ext]",
        chunkFileNames: "assets/[name].[hash].js",
        entryFileNames: "assets/[name].[hash].js",
      },
    },
  },
  preview: {
    // Agrega el host generado por Localtunnel aquí
    allowedHosts: ["whackamole.loca.lt"],
    // Opcional: expone el servidor a todas las redes
    host: true,
    port: 4173,
  },
  plugins: [
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        globPatterns: ["**/*.{js,css,html,png,svg,ico,json}"], // Cachea todos los archivos relevantes
      },
      manifest: {
        name: "Whack a Mole",
        short_name: "Whakamole",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#000000",
        icons: [
          {
            src: "/favicon/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/favicon/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
