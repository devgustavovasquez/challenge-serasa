import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { Test, TestingModule } from "@nestjs/testing";
import { PrismaClient } from "@prisma/client";
import { execSync } from "child_process";
import * as nock from "nock";
import { AppModule } from "src/app.module";
import { DatabaseModule } from "src/infra/database/database.module";
import { HttpModule } from "src/infra/http/http.module";

let app: NestFastifyApplication;
const prisma = new PrismaClient();

async function setup() {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule, DatabaseModule, HttpModule],
  }).compile();

  app = moduleFixture.createNestApplication<NestFastifyApplication>(
    new FastifyAdapter(),
  );
  await app.init();
  await app.getHttpAdapter().getInstance().ready();

  await clearDb();

  nock.disableNetConnect();
  nock.enableNetConnect("127.0.0.1");
}

async function clearDb() {
  execSync("npx prisma migrate deploy");

  await prisma.farm.deleteMany();
  await prisma.producer.deleteMany();
  await prisma.address.deleteMany();
  await prisma.harvest.deleteMany();
  await prisma.crop.deleteMany();
}

async function teardown() {
  await app.close();
  await prisma.$disconnect();
  nock.cleanAll();
  nock.enableNetConnect();
}

beforeAll(setup);
afterAll(teardown);

export { app, prisma };
