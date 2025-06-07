import { Body, Controller, Get, Param, Post, Put, Query } from "@nestjs/common";
import { AddFarmUseCase } from "src/application/use-cases/add-farm-use-case";
import { ListFarmsUseCase } from "src/application/use-cases/list-farms-use-case";
import { UpdateFarmUseCase } from "src/application/use-cases/update-farm-use-case";
import { CreateFarmDto } from "../dtos/create-farm-dto";
import { ListFarmsDto } from "../dtos/list-farms-dto";
import {
  UpdateFarmBodyDto,
  UpdateFarmParamsDto,
} from "../dtos/update-farm-dto";
import { FarmViewModel } from "../view-models/farm-view-model";

@Controller("farms")
export class FarmController {
  constructor(
    private readonly addFarmUseCase: AddFarmUseCase,
    private readonly listFarmsUseCase: ListFarmsUseCase,
    private readonly updateFarmUseCase: UpdateFarmUseCase,
  ) {}

  @Post()
  async create(@Body() body: CreateFarmDto): Promise<unknown> {
    const result = await this.addFarmUseCase.execute({ ...body });

    return FarmViewModel.toHTTP(result);
  }

  @Get()
  async list(@Query() query: ListFarmsDto): Promise<unknown> {
    const result = await this.listFarmsUseCase.execute(query);

    return {
      data: result.data.map(FarmViewModel.toHTTP),
      meta: result.meta,
    };
  }

  @Put("/:id")
  async update(
    @Param() params: UpdateFarmParamsDto,
    @Body() body: UpdateFarmBodyDto,
  ): Promise<void> {
    await this.updateFarmUseCase.execute({ ...body, id: params.id });

    return;
  }
}
