import { Module } from "@nestjs/common";
import { ProducerRepository } from "src/application/repositories/producer-repository";
import { PrismaService } from "./prisma/prisma.service";
import { PrismaProducerRepository } from "./prisma/repositories/producer-prisma-repository";

@Module({
  providers: [
    PrismaService,
    {
      provide: ProducerRepository,
      useClass: PrismaProducerRepository,
    },
  ],
  exports: [ProducerRepository],
})
export class DatabaseModule {}
