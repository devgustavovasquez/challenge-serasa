import { Body, Controller, Post } from "@nestjs/common";
import { AddHarvestUseCase } from "src/application/use-cases/add-harvest-use-case";
import { CreateHarvestDto } from "../dtos/create-harvest-dto";

@Controller("harvests")
export class HarvestController {
  constructor(private readonly addHarvestUseCase: AddHarvestUseCase) {}

  @Post()
  async create(@Body() body: CreateHarvestDto): Promise<unknown> {
    return await this.addHarvestUseCase.execute({ ...body });
  }
}
