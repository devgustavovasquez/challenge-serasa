import { Module } from "@nestjs/common";
import { AddProducerUseCase } from "src/application/use-cases/add-producer-use-case";
import { DeleteProducerUseCase } from "src/application/use-cases/delete-producer-use-case";
import { GetProducerUseCase } from "src/application/use-cases/get-producer-use-case";
import { ListProducersUseCase } from "src/application/use-cases/list-producers-use-case";
import { UpdateProducerUseCase } from "src/application/use-cases/update-producer-use-case";
import { DatabaseModule } from "../database/database.module";
import { ProducerController } from "./controllers/producer.controller";

@Module({
  imports: [DatabaseModule],
  providers: [
    AddProducerUseCase,
    GetProducerUseCase,
    ListProducersUseCase,
    UpdateProducerUseCase,
    DeleteProducerUseCase,
  ],
  controllers: [ProducerController],
})
export class HttpModule {}
