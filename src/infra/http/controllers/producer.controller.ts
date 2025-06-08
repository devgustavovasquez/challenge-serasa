import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AddProducerUseCase } from "src/application/use-cases/add-producer-use-case";
import { DeleteProducerUseCase } from "src/application/use-cases/delete-producer-use-case";
import { GetProducerUseCase } from "src/application/use-cases/get-producer-use-case";
import { ListProducersUseCase } from "src/application/use-cases/list-producers-use-case";
import { UpdateProducerUseCase } from "src/application/use-cases/update-producer-use-case";
import { CreateProducerDto } from "../dtos/create-producer-dto";
import { DeleteProducerDto } from "../dtos/delete-producer-dto";
import { GetProducerDto } from "../dtos/get-producer-dto";
import { ListProducersDto } from "../dtos/list-producers-dto";
import {
  PaginatedProducerResponseDto,
  ProducerResponseDto,
} from "../dtos/response/producer-response-dto";
import {
  UpdateProducerBodyDto,
  UpdateProducerParamsDto,
} from "../dtos/update-producer-dto";
import { ProducerViewModel } from "../view-models/producer-view-model";

@ApiTags("Producers")
@Controller("producers")
export class ProducerController {
  constructor(
    private readonly addProducerUseCase: AddProducerUseCase,
    private readonly getProducerUseCase: GetProducerUseCase,
    private readonly listProducersUseCase: ListProducersUseCase,
    private readonly updateProducerUseCase: UpdateProducerUseCase,
    private readonly deleteProducerUseCase: DeleteProducerUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: "Create producer" })
  @ApiResponse({
    status: 201,
    type: ProducerResponseDto,
    description: "The producer has been successfully created.",
  })
  async create(@Body() body: CreateProducerDto): Promise<ProducerResponseDto> {
    const result = await this.addProducerUseCase.execute({
      document: body.document,
      name: body.name,
    });

    return ProducerViewModel.toHTTP(result);
  }

  @Get("/:id")
  @ApiOperation({ summary: "Get producer by id" })
  @ApiResponse({
    status: 200,
    type: ProducerResponseDto,
    description: "The producer has been successfully found.",
  })
  async get(@Param() params: GetProducerDto): Promise<ProducerResponseDto> {
    const result = await this.getProducerUseCase.execute({
      producerId: params.id,
    });

    return ProducerViewModel.toHTTP(result);
  }

  @Get()
  @ApiOperation({ summary: "List producers" })
  @ApiResponse({
    status: 200,
    type: PaginatedProducerResponseDto,
    description: "The producers has been successfully listed.",
  })
  async list(
    @Query() query: ListProducersDto,
  ): Promise<PaginatedProducerResponseDto> {
    const result = await this.listProducersUseCase.execute(query);

    return {
      data: result.data.map(ProducerViewModel.toHTTP),
      meta: result.meta,
    };
  }

  @Put("/:id")
  @ApiOperation({ summary: "Update producer" })
  @ApiResponse({
    status: 200,
    type: undefined,
    description: "The producer has been successfully updated.",
  })
  async update(
    @Param() params: UpdateProducerParamsDto,
    @Body() body: UpdateProducerBodyDto,
  ): Promise<void> {
    await this.updateProducerUseCase.execute({ ...body, id: params.id });

    return;
  }

  @Delete("/:id")
  @ApiOperation({ summary: "Delete producer" })
  @ApiResponse({
    status: 200,
    type: undefined,
    description: "The producer has been successfully deleted.",
  })
  async delete(@Param() params: DeleteProducerDto): Promise<void> {
    await this.deleteProducerUseCase.execute({ id: params.id });

    return;
  }
}
