import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/",
  preview: {
    port: 8386,
    strictPort: true,
  },
  server: {
    port: 8386,
    strictPort: true,
    host: true,
    origin: "http://0.0.0.0:8386",
  },
});
