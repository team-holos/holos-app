import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // LM Studio's API path
      "/api/chat": {
        target: "http://127.0.0.1:1234",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/chat/, "/v1"),
      },

      // Other backend routes
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, "/api"),
      },
    },
  },
});


