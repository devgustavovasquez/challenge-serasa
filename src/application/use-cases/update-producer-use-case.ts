import { Injectable, Logger } from "@nestjs/common";
import { Producer } from "src/domain/entities/producer";
import { Document } from "src/domain/entities/value-object/document";
import { ProducerRepository } from "../repositories/producer-repository";

export type UpdateProducerInput = {
  id: string;
  name: string;
  document: string;
};

export type UpdateProducerOutput = void;

@Injectable()
export class UpdateProducerUseCase {
  private readonly logger = new Logger(UpdateProducerUseCase.name);

  constructor(private producerRepository: ProducerRepository) {}

  async execute(input: UpdateProducerInput): Promise<UpdateProducerOutput> {
    this.logger.log(`Updating producer with ID: ${input.id}`);

    try {
      const document = Document.create(input.document);

      const producerExists = await this.producerRepository.findById(input.id);
      if (!producerExists) {
        this.logger.warn(`Producer not found with ID: ${input.id}`);
        throw new Error("Producer not found");
      }

      const producer = Producer.create(
        {
          name: input.name,
          document,
          updatedAt: new Date(),
          createdAt: producerExists.createdAt,
        },
        input.id,
      );

      await this.producerRepository.update(producer);
      this.logger.log(`Producer updated successfully: ${input.id}`);
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(
          `Error updating producer: ${error.message}`,
          error.stack,
        );
      } else {
        this.logger.error("Unknown error updating producer");
      }
      throw error;
    }
  }
}
