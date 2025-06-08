import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AddFarmUseCase } from "src/application/use-cases/add-farm-use-case";
import { ListFarmsUseCase } from "src/application/use-cases/list-farms-use-case";
import { UpdateFarmUseCase } from "src/application/use-cases/update-farm-use-case";
import { CreateFarmDto } from "../dtos/create-farm-dto";
import { ListFarmsDto } from "../dtos/list-farms-dto";
import {
  FarmPaginatedResponseDto,
  FarmResponseDto,
} from "../dtos/response/farm-response-dto";
import {
  UpdateFarmBodyDto,
  UpdateFarmParamsDto,
} from "../dtos/update-farm-dto";
import { FarmViewModel } from "../view-models/farm-view-model";

@ApiTags("Farms")
@Controller("farms")
export class FarmController {
  private readonly logger = new Logger(FarmController.name);

  constructor(
    private readonly addFarmUseCase: AddFarmUseCase,
    private readonly listFarmsUseCase: ListFarmsUseCase,
    private readonly updateFarmUseCase: UpdateFarmUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: "Create a new farm" })
  @ApiResponse({ status: 201, type: FarmResponseDto, description: "Created" })
  async create(@Body() body: CreateFarmDto): Promise<unknown> {
    this.logger.log(`Creating farm with data: ${JSON.stringify(body)}`);

    try {
      const result = await this.addFarmUseCase.execute({ ...body });

      this.logger.log(`Farm created successfully: ${JSON.stringify(result)}`);

      return FarmViewModel.toHTTP(result);
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(
          `Failed to create farm: ${error.message}`,
          error.stack,
        );
      }
      throw error;
    }
  }

  @Get()
  @ApiOperation({ summary: "List all farms" })
  @ApiResponse({
    status: 200,
    type: FarmPaginatedResponseDto,
    description: "The list of farms",
  })
  async list(@Query() query: ListFarmsDto): Promise<FarmPaginatedResponseDto> {
    this.logger.log(`Listing farms with query: ${JSON.stringify(query)}`);

    try {
      const result = await this.listFarmsUseCase.execute(query);

      this.logger.log(`Farms listed successfully, total: ${result.meta.total}`);

      return {
        data: result.data.map(FarmViewModel.toHTTP),
        meta: result.meta,
      };
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(
          `Failed to list farms: ${error.message}`,
          error.stack,
        );
      }
      throw error;
    }
  }

  @Put("/:id")
  @ApiOperation({ summary: "Update a farm by ID" })
  @ApiResponse({ status: 200, type: undefined, description: "Updated" })
  async update(
    @Param() params: UpdateFarmParamsDto,
    @Body() body: UpdateFarmBodyDto,
  ): Promise<void> {
    this.logger.log(
      `Updating farm ${params.id} with data: ${JSON.stringify(body)}`,
    );

    try {
      await this.updateFarmUseCase.execute({ ...body, id: params.id });

      this.logger.log(`Farm ${params.id} updated successfully`);

      return;
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(
          `Failed to update farm ${params.id}: ${error.message}`,
          error.stack,
        );
      }
      throw error;
    }
  }
}
