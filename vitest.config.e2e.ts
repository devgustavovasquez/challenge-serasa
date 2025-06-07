import swc from "unplugin-swc";
import { loadEnv } from "vite";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    root: "./",
    globals: true,
    environment: "node",
    env: loadEnv("test", process.cwd(), ""),
    include: ["test/**/*.e2e-spec.ts"],
  },
  plugins: [swc.vite()],
});
