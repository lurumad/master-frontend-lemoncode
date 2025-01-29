import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react({
      include: ["**/*.tsx", "**/*.ts"],
    }),
    tailwindcss(),
  ],
  base: "",
  root: "./src",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    open: true,
  },
  preview: {
    open: true,
    port: 8080,
  },
});
