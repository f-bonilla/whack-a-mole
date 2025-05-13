import { defineConfig } from "vite";

export default defineConfig({
  server: {
    historyApiFallback: true, // Habilita la redirección a index.html
  },
});