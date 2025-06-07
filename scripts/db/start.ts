import { execSync } from "child_process";
import { waitForDatabase } from "./wait";

export async function startDB() {
  console.log("🧪 subindo banco de testes...");
  execSync("docker compose -f docker-compose.e2e.yml up -d", {
    stdio: "inherit",
  });
  await waitForDatabase();
}
