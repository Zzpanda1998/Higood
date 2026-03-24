import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // Use relative asset paths so the app works on both GitHub Pages and Vercel.
  base: "./",
  plugins: [react()]
});
