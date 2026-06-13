import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Project Pages live at https://agisota.github.io/rox-motion/
export default defineConfig({
  root: __dirname,
  base: "/rox-motion/",
  plugins: [react()],
  build: { outDir: "dist", emptyOutDir: true },
});
