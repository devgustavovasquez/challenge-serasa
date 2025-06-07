const args = process.argv.slice(2);
const command = args[0];

async function runE2E() {
  const { startDB } = await import("./db/start");
  const { stopDB } = await import("./db/stop");
  const { runVitestE2E } = await import("./run-vitest");

  await startDB();
  await runVitestE2E();
  await stopDB();
}

switch (command) {
  case "e2e":
    runE2E();
    break;

  default:
    console.log(`❌ comando desconhecido: ${command}`);
    process.exit(1);
}
