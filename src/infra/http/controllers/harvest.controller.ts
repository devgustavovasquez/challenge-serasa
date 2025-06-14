import { Body, Controller, Logger, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AddHarvestUseCase } from "src/application/use-cases/add-harvest-use-case";
import { CreateHarvestDto } from "../dtos/create-harvest-dto";
import { HarvestResponseDto } from "../dtos/response/harvest-response-dto";
import { HarvestViewModel } from "../view-models/harvest-view-model";

@ApiTags("Harvests")
@Controller("harvests")
export class HarvestController {
  private readonly logger = new Logger(HarvestController.name);

  constructor(private readonly addHarvestUseCase: AddHarvestUseCase) {}

  @Post()
  @ApiOperation({ summary: "Create a new harvest" })
  @ApiResponse({
    status: 201,
    type: HarvestResponseDto,
    description: "Created",
  })
  async create(@Body() body: CreateHarvestDto): Promise<HarvestResponseDto> {
    this.logger.log(`Creating harvest with data: ${JSON.stringify(body)}`);

    try {
      const result = await this.addHarvestUseCase.execute({ ...body });

      this.logger.log(
        `Harvest created successfully: ${JSON.stringify(result)}`,
      );
      return HarvestViewModel.toHTTP(result);
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(
          `Failed to create harvest: ${error.message}`,
          error.stack,
        );
      }

      throw error;
    }
  }
}
