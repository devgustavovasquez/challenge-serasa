import { ValidationPipe } from "@nestjs/common";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { Test, TestingModule } from "@nestjs/testing";
import { PrismaClient } from "@prisma/client";
import { execSync } from "child_process";
import { randomUUID } from "crypto";
import * as nock from "nock";
import { AppModule } from "src/app.module";
import { DatabaseModule } from "src/infra/database/database.module";
import { HttpModule } from "src/infra/http/http.module";

let app: NestFastifyApplication;
let prisma: PrismaClient;
let schemaName: string;

async function setup() {
  generateDatabaseUrl();

  prisma = new PrismaClient();

  await prisma.$executeRawUnsafe(`CREATE SCHEMA IF NOT EXISTS "${schemaName}"`);

  execSync("npx prisma migrate deploy", { stdio: "inherit" });

  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule, DatabaseModule, HttpModule],
  }).compile();

  app = moduleFixture.createNestApplication<NestFastifyApplication>(
    new FastifyAdapter(),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.init();
  await app.getHttpAdapter().getInstance().ready();

  nock.disableNetConnect();
  nock.enableNetConnect("127.0.0.1");
}

function generateDatabaseUrl() {
  schemaName = `test_${randomUUID().replace(/-/g, "")}`;

  process.env.DATABASE_URL = `postgresql://test:test@localhost:5433/test?schema=${schemaName}`;

  return process.env.DATABASE_URL;
}

async function teardown() {
  prisma = new PrismaClient();
  await app.close();
  await prisma.$disconnect();

  await prisma.$executeRawUnsafe(
    `DROP SCHEMA IF EXISTS "${schemaName}" CASCADE`,
  );

  nock.cleanAll();
  nock.enableNetConnect();
}

beforeAll(setup);
afterAll(teardown);

export { app, prisma };
