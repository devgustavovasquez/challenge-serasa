import { ProducerRepository } from "../repositories/producer-repository";

export type DeleteProducerInput = {
  id: string;
};

export type DeleteProducerOutput = void;

export class DeleteProducerUseCase {
  constructor(private producerRepository: ProducerRepository) {}

  async execute(input: DeleteProducerInput): Promise<DeleteProducerOutput> {
    const producer = await this.producerRepository.findById(input.id);

    if (!producer) {
      throw new Error("Producer not found");
    }

    await this.producerRepository.delete(input.id);
  }
}
