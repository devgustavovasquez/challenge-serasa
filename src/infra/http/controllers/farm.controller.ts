import { Body, Controller, Get, Param, Post, Put, Query } from "@nestjs/common";
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
  constructor(
    private readonly addFarmUseCase: AddFarmUseCase,
    private readonly listFarmsUseCase: ListFarmsUseCase,
    private readonly updateFarmUseCase: UpdateFarmUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: "Create a new farm" })
  @ApiResponse({ status: 201, type: FarmResponseDto, description: "Created" })
  async create(@Body() body: CreateFarmDto): Promise<unknown> {
    const result = await this.addFarmUseCase.execute({ ...body });

    return FarmViewModel.toHTTP(result);
  }

  @Get()
  @ApiOperation({ summary: "List all farms" })
  @ApiResponse({
    status: 200,
    type: FarmPaginatedResponseDto,
    description: "The list of farms",
  })
  async list(@Query() query: ListFarmsDto): Promise<FarmPaginatedResponseDto> {
    const result = await this.listFarmsUseCase.execute(query);

    return {
      data: result.data.map(FarmViewModel.toHTTP),
      meta: result.meta,
    };
  }

  @Put("/:id")
  @ApiOperation({ summary: "Update a farm by ID" })
  @ApiResponse({ status: 200, type: undefined, description: "Updated" })
  async update(
    @Param() params: UpdateFarmParamsDto,
    @Body() body: UpdateFarmBodyDto,
  ): Promise<void> {
    await this.updateFarmUseCase.execute({ ...body, id: params.id });

    return;
  }
}
