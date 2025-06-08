import { Injectable, Logger } from "@nestjs/common";
import { Producer } from "src/domain/entities/producer";
import { Document } from "src/domain/entities/value-object/document";
import { ProducerRepository } from "../repositories/producer-repository";

export type AddProducerInput = {
  name: string;
  document: string;
};

export type AddProducerOutput = Producer;

@Injectable()
export class AddProducerUseCase {
  private readonly logger = new Logger(AddProducerUseCase.name);

  constructor(private producerRepository: ProducerRepository) {}

  async execute(input: AddProducerInput): Promise<AddProducerOutput> {
    this.logger.log(`Starting to add producer with document=${input.document}`);

    try {
      const document = Document.create(input.document);
      const producer = Producer.create({ name: input.name, document });

      await this.producerRepository.create(producer);

      this.logger.log(`Producer created with id=${producer.id}`);
      return producer;
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(
          `Error adding producer: ${error.message}`,
          error.stack,
        );
      } else {
        this.logger.error("Unknown error adding producer");
      }
      throw error;
    }
  }
}
