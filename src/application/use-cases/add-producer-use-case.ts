import { Producer } from "src/domain/entities/producer";
import { Document } from "src/domain/entities/value-object/document";
import { ProducerRepository } from "../repositories/producer-repository";

export type AddProducerInput = {
  name: string;
  document: string;
};

export type AddProducerOutput = Producer;

export class AddProducerUseCase {
  constructor(private producerRepository: ProducerRepository) {}

  async execute(input: AddProducerInput): Promise<AddProducerOutput> {
    const document = Document.create(input.document);
    const producer = Producer.create({ name: input.name, document });
    await this.producerRepository.create(producer);
    return producer;
  }
}
