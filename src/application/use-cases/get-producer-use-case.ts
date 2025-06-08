import { Injectable, Logger } from "@nestjs/common";
import { Producer } from "src/domain/entities/producer";
import { ProducerRepository } from "../repositories/producer-repository";

export type GetProducerInput = {
  producerId: string;
};

export type GetProducerOutput = Producer;

@Injectable()
export class GetProducerUseCase {
  private readonly logger = new Logger(GetProducerUseCase.name);

  constructor(private producerRepository: ProducerRepository) {}

  async execute(input: GetProducerInput): Promise<GetProducerOutput> {
    this.logger.log(`Fetching producer with id=${input.producerId}`);

    try {
      const producer = await this.producerRepository.findById(input.producerId);

      if (!producer) {
        this.logger.warn(`Producer not found with id=${input.producerId}`);
        throw new Error("Producer not found");
      }

      this.logger.log(`Producer found with id=${input.producerId}`);
      return producer;
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(
          `Error fetching producer: ${error.message}`,
          error.stack,
        );
      } else {
        this.logger.error("Unknown error fetching producer");
      }
      throw error;
    }
  }
}
