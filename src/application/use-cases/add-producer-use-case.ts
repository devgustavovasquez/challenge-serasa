import { Producer } from "src/domain/entities/producer";
import { ProducerRepository } from "../repositories/producer-repository";
import { Address } from "src/domain/entities/value-object/address";
import { Document } from "src/domain/entities/value-object/document";

export type AddProducerInput = {
  name: string;
  document: string;
  state: string;
  city: string;
};

export type AddProducerOutput = Producer;

export class AddProducerUseCase {
  constructor(private producerRepository: ProducerRepository) {}

  async execute(input: AddProducerInput): Promise<AddProducerOutput> {
    const document = Document.create(input.document);
    const address = Address.create({ city: input.city, state: input.state });
    const producer = Producer.create({ name: input.name, document, address });
    await this.producerRepository.create(producer);
    return producer;
  }
}
