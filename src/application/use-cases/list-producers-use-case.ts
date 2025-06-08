import { Injectable, Logger } from "@nestjs/common";
import { Producer } from "src/domain/entities/producer";
import { PaginatedResult, PaginationParams } from "../repositories/base";
import { ProducerRepository } from "../repositories/producer-repository";

export type ListProducersInput = PaginationParams<unknown, unknown>;

export type ListProducersOutput = PaginatedResult<Producer>;

@Injectable()
export class ListProducersUseCase {
  private readonly logger = new Logger(ListProducersUseCase.name);

  constructor(private producerRepository: ProducerRepository) {}

  async execute(input: ListProducersInput): Promise<ListProducersOutput> {
    this.logger.log(`Listing producers with params: ${JSON.stringify(input)}`);

    try {
      const result = await this.producerRepository.findAll(input);
      this.logger.log(`Found ${result.data.length} producers`);
      return result;
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(
          `Error listing producers: ${error.message}`,
          error.stack,
        );
      } else {
        this.logger.error("Unknown error listing producers");
      }
      throw error;
    }
  }
}
