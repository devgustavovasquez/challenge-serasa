import { Body, Controller, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AddHarvestUseCase } from "src/application/use-cases/add-harvest-use-case";
import { CreateHarvestDto } from "../dtos/create-harvest-dto";
import { HarvestResponseDto } from "../dtos/response/harvest-response-dto";
import { HarvestViewModel } from "../view-models/harvest-view-model";

@ApiTags("Harvests")
@Controller("harvests")
export class HarvestController {
  constructor(private readonly addHarvestUseCase: AddHarvestUseCase) {}

  @Post()
  @ApiOperation({ summary: "Create a new harvest" })
  @ApiResponse({
    status: 201,
    type: HarvestResponseDto,
    description: "Created",
  })
  async create(@Body() body: CreateHarvestDto): Promise<HarvestResponseDto> {
    const result = await this.addHarvestUseCase.execute({ ...body });

    return HarvestViewModel.toHTTP(result);
  }
}
