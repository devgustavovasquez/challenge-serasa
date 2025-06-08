import { Injectable, Logger } from "@nestjs/common";
import { ProducerRepository } from "../repositories/producer-repository";

export type DeleteProducerInput = {
  id: string;
};

export type DeleteProducerOutput = void;

@Injectable()
export class DeleteProducerUseCase {
  private readonly logger = new Logger(DeleteProducerUseCase.name);

  constructor(private producerRepository: ProducerRepository) {}

  async execute(input: DeleteProducerInput): Promise<DeleteProducerOutput> {
    this.logger.log(`Starting to delete producer with id=${input.id}`);

    try {
      const producer = await this.producerRepository.findById(input.id);

      if (!producer) {
        this.logger.warn(`Producer not found with id=${input.id}`);
        throw new Error("Producer not found");
      }

      await this.producerRepository.delete(input.id);
      this.logger.log(`Producer deleted with id=${input.id}`);
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(
          `Error deleting producer: ${error.message}`,
          error.stack,
        );
      } else {
        this.logger.error("Unknown error deleting producer");
      }
      throw error;
    }
  }
}
