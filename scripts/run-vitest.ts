import { execSync } from "child_process";

export async function runVitestE2E() {
  console.log("⚙️ rodando testes com vitest...");
  execSync("vitest run --config vitest.config.e2e.ts", { stdio: "inherit" });
}
