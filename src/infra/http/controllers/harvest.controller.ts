import { Body, Controller, Post } from "@nestjs/common";
import { AddHarvestUseCase } from "src/application/use-cases/add-harvest-use-case";
import { CreateHarvestDto } from "../dtos/create-harvest-dto";
import { HarvestViewModel } from "../view-models/harvest-view-model";

@Controller("harvests")
export class HarvestController {
  constructor(private readonly addHarvestUseCase: AddHarvestUseCase) {}

  @Post()
  async create(@Body() body: CreateHarvestDto): Promise<unknown> {
    const result = await this.addHarvestUseCase.execute({ ...body });

    return HarvestViewModel.toHTTP(result);
  }
}
