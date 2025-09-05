
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// http://localhost:5173 llama a /api/* y Vite lo reenvía a json-server en 3000
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
