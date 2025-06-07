import { execSync } from "child_process";

export async function stopDB() {
  console.log("🧹 derrubando banco de testes...");
  execSync("docker compose -f docker-compose.e2e.yml down -v", {
    stdio: "inherit",
  });
}
