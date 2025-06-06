import { Module } from "@nestjs/common";
import { DashboardQuery } from "src/application/queries/dashboard-query";
import { FarmRepository } from "src/application/repositories/farm-repository";
import { HarvestRepository } from "src/application/repositories/harvest-repository";
import { ProducerRepository } from "src/application/repositories/producer-repository";
import { PrismaService } from "./prisma/prisma.service";
import { PrismaDashboardQuery } from "./prisma/queries/dashboard-prisma-query";
import { PrismaFarmRepository } from "./prisma/repositories/farm-prisma-repository";
import { PrismaHarvestRepository } from "./prisma/repositories/harvest-prisma-repository";
import { PrismaProducerRepository } from "./prisma/repositories/producer-prisma-repository";

@Module({
  providers: [
    PrismaService,
    {
      provide: ProducerRepository,
      useClass: PrismaProducerRepository,
    },
    {
      provide: FarmRepository,
      useClass: PrismaFarmRepository,
    },
    {
      provide: HarvestRepository,
      useClass: PrismaHarvestRepository,
    },
    {
      provide: DashboardQuery,
      useClass: PrismaDashboardQuery,
    },
  ],
  exports: [
    ProducerRepository,
    FarmRepository,
    HarvestRepository,
    DashboardQuery,
  ],
})
export class DatabaseModule {}
