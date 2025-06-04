import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
    root: "./",
    globals: true,
    isolate: false,
    passWithNoTests: true,
    include: ["src/**/*.spec.ts"],
    coverage: {
      provider: "istanbul",
      reporter: ["text", "json", "html"],
      reportsDirectory: "coverage",
      include: ["src/**/*.ts"],
    },
  }
})