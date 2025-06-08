import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
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
  private readonly logger = new Logger(ProducerController.name);

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
    this.logger.log(`create() called with body: ${JSON.stringify(body)}`);
    try {
      const result = await this.addProducerUseCase.execute({
        document: body.document,
        name: body.name,
      });

      this.logger.log(`Producer created successfully: id=${result.id}`);
      return ProducerViewModel.toHTTP(result);
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(`create() failed: ${error.message}`, error.stack);
      }
      throw error;
    }
  }

  @Get("/:id")
  @ApiOperation({ summary: "Get producer by id" })
  @ApiResponse({
    status: 200,
    type: ProducerResponseDto,
    description: "The producer has been successfully found.",
  })
  async get(@Param() params: GetProducerDto): Promise<ProducerResponseDto> {
    this.logger.log(`get() called with id: ${params.id}`);
    try {
      const result = await this.getProducerUseCase.execute({
        producerId: params.id,
      });

      this.logger.log(`Producer found: id=${result.id}`);
      return ProducerViewModel.toHTTP(result);
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(`get() failed: ${error.message}`, error.stack);
      }
      throw error;
    }
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
    this.logger.log(`list() called with query: ${JSON.stringify(query)}`);
    try {
      const result = await this.listProducersUseCase.execute(query);

      this.logger.log(
        `list() success: returned ${result.data.length} producers`,
      );
      return {
        data: result.data.map(ProducerViewModel.toHTTP),
        meta: result.meta,
      };
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(`list() failed: ${error.message}`, error.stack);
      }
      throw error;
    }
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
    this.logger.log(
      `update() called with id: ${params.id} and body: ${JSON.stringify(body)}`,
    );
    try {
      await this.updateProducerUseCase.execute({ ...body, id: params.id });

      this.logger.log(`Producer updated successfully: id=${params.id}`);
      return;
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(`update() failed: ${error.message}`, error.stack);
      }
      throw error;
    }
  }

  @Delete("/:id")
  @ApiOperation({ summary: "Delete producer" })
  @ApiResponse({
    status: 200,
    type: undefined,
    description: "The producer has been successfully deleted.",
  })
  async delete(@Param() params: DeleteProducerDto): Promise<void> {
    this.logger.log(`delete() called with id: ${params.id}`);
    try {
      await this.deleteProducerUseCase.execute({ id: params.id });

      this.logger.log(`Producer deleted successfully: id=${params.id}`);
      return;
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(`delete() failed: ${error.message}`, error.stack);
      }
      throw error;
    }
  }
}
