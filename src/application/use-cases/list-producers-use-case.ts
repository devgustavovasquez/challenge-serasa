import { Injectable } from "@nestjs/common";
import { Producer } from "src/domain/entities/producer";
import { PaginatedResult, PaginationParams } from "../repositories/base";
import { ProducerRepository } from "../repositories/producer-repository";

export type ListProducersInput = PaginationParams<unknown, unknown>;

export type ListProducersOutput = PaginatedResult<Producer>;

@Injectable()
export class ListProducersUseCase {
  constructor(private producerRepository: ProducerRepository) {}

  async execute(input: ListProducersInput): Promise<ListProducersOutput> {
    return await this.producerRepository.findAll(input);
  }
}
