import { Producer } from "src/domain/entities/producer";
import { Document } from "src/domain/entities/value-object/document";
import { ProducerRepository } from "../repositories/producer-repository";

export type UpdateProducerInput = {
  id: string;
  name: string;
  document: string;
};

export type UpdateProducerOutput = void;

export class UpdateProducerUseCase {
  constructor(private producerRepository: ProducerRepository) {}

  async execute(input: UpdateProducerInput): Promise<UpdateProducerOutput> {
    const document = Document.create(input.document);

    const producerExists = await this.producerRepository.findById(input.id);

    if (!producerExists) {
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
  }
}
