import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
const serverURL = "http://localhost:3000";
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: serverURL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
