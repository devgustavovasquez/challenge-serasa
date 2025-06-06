import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/main.ts"],
  splitting: false,
  sourcemap: true,
  clean: true,
  dts: false,
  format: "cjs",
  outDir: "dist",
  target: "esnext",
});
