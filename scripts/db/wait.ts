import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function waitForDatabase(timeoutMs = 10000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      await new Promise((res) => setTimeout(res, 2000));
      await prisma.$connect();
      await prisma.$disconnect();
      return;
    } catch {
      await new Promise((res) => setTimeout(res, 500));
    }
  }

  throw new Error("⏳ timeout esperando o banco subir");
}
