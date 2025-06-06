import { Module } from "@nestjs/common";
import { AddFarmUseCase } from "src/application/use-cases/add-farm-use-case";
import { AddHarvestUseCase } from "src/application/use-cases/add-harvest-use-case";
import { AddProducerUseCase } from "src/application/use-cases/add-producer-use-case";
import { DeleteProducerUseCase } from "src/application/use-cases/delete-producer-use-case";
import { GetProducerUseCase } from "src/application/use-cases/get-producer-use-case";
import { ListFarmsUseCase } from "src/application/use-cases/list-farms-use-case";
import { ListProducersUseCase } from "src/application/use-cases/list-producers-use-case";
import { UpdateFarmUseCase } from "src/application/use-cases/update-farm-use-case";
import { UpdateProducerUseCase } from "src/application/use-cases/update-producer-use-case";
import { DatabaseModule } from "../database/database.module";
import { DashboardController } from "./controllers/dashboard.controller";
import { FarmController } from "./controllers/farm.controller";
import { HarvestController } from "./controllers/harvest.controller";
import { ProducerController } from "./controllers/producer.controller";

@Module({
  imports: [DatabaseModule],
  providers: [
    AddProducerUseCase,
    GetProducerUseCase,
    ListProducersUseCase,
    UpdateProducerUseCase,
    DeleteProducerUseCase,
    AddFarmUseCase,
    ListFarmsUseCase,
    UpdateFarmUseCase,
    AddHarvestUseCase,
  ],
  controllers: [
    ProducerController,
    FarmController,
    HarvestController,
    DashboardController,
  ],
})
export class HttpModule {}
