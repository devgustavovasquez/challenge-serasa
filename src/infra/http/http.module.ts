import { Module } from "@nestjs/common";
import { AddProducerUseCase } from "src/application/use-cases/add-producer-use-case";
import { DatabaseModule } from "../database/database.module";
import { ProducerController } from "./controllers/producer.controller";

@Module({
  imports: [DatabaseModule],
  providers: [AddProducerUseCase],
  controllers: [ProducerController],
})
export class HttpModule {}
