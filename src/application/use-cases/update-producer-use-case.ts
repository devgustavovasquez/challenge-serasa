import { Producer } from "src/domain/entities/producer";
import { Address } from "src/domain/entities/value-object/address";
import { Document } from "src/domain/entities/value-object/document";
import { ProducerRepository } from "../repositories/producer-repository";

export type UpdateProducerInput = {
  id: string;
  name: string;
  document: string;
  state: string;
  city: string;
};

export type UpdateProducerOutput = void;

export class UpdateProducerUseCase {
  constructor(private producerRepository: ProducerRepository) {}

  async execute(input: UpdateProducerInput): Promise<UpdateProducerOutput> {
    const document = Document.create(input.document);
    const address = Address.create({ city: input.city, state: input.state });

    const producerExists = await this.producerRepository.findById(input.id);

    if (!producerExists) {
      throw new Error("Producer not found");
    }

    const producer = Producer.create(
      {
        name: input.name,
        document,
        address,
        updatedAt: new Date(),
        createdAt: producerExists.createdAt,
      },
      input.id,
    );

    await this.producerRepository.update(producer);
  }
}
