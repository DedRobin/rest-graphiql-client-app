import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./src/__tests__/setup.ts"],
    coverage: {
      include: ["src/**"],
    },
    watch: false
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

});
