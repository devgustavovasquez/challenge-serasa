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
  UpdateProducerBodyDto,
  UpdateProducerParamsDto,
} from "../dtos/update-producer-dto";

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
  async create(@Body() body: CreateProducerDto): Promise<unknown> {
    return await this.addProducerUseCase.execute({
      document: body.document,
      name: body.name,
    });
  }

  @Get("/:id")
  async get(@Param() params: GetProducerDto): Promise<unknown> {
    return await this.getProducerUseCase.execute({ producerId: params.id });
  }

  @Get()
  async list(@Query() query: ListProducersDto): Promise<unknown> {
    return await this.listProducersUseCase.execute(query);
  }

  @Put("/:id")
  async update(
    @Param() params: UpdateProducerParamsDto,
    @Body() body: UpdateProducerBodyDto,
  ): Promise<unknown> {
    return await this.updateProducerUseCase.execute({ ...body, id: params.id });
  }

  @Delete("/:id")
  async delete(@Param() params: DeleteProducerDto): Promise<unknown> {
    return await this.deleteProducerUseCase.execute({ id: params.id });
  }
}
