import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tailwindcss from '@tailwindcss/vite';
import tsconfigPaths from "vite-tsconfig-paths";
import * as path from "path";

export default defineConfig({
    plugins: [
        react({
            include: ["**/*.tsx", "**/*.ts"],
        }),
        tailwindcss(),
        tsconfigPaths(),
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
    test: {
        globals: true,
        environment: "jsdom",
        clearMocks: true,
        restoreMocks: true,
    },
});
