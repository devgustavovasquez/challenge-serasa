import { Body, Controller, Post } from "@nestjs/common";
import { AddProducerUseCase } from "src/application/use-cases/add-producer-use-case";

@Controller("producers")
export class ProducerController {
  constructor(private readonly addProducerUseCase: AddProducerUseCase) {}

  @Post()
  async create(
    @Body() body: { document: string; name: string },
  ): Promise<unknown> {
    return await this.addProducerUseCase.execute({
      document: body.document,
      name: body.name,
    });
  }
}
