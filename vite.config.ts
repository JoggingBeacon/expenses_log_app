import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@src": "/src",
      "@pages": "/src/pages",
      "@assets": "/src/assets",
    },
  },
  plugins: [react()],
});
