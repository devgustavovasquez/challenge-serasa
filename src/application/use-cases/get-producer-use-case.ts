import { Injectable } from "@nestjs/common";
import { Producer } from "src/domain/entities/producer";
import { ProducerRepository } from "../repositories/producer-repository";

export type GetProducerInput = {
  producerId: string;
};

export type GetProducerOutput = Producer;

@Injectable()
export class GetProducerUseCase {
  constructor(private producerRepository: ProducerRepository) {}

  async execute(input: GetProducerInput): Promise<GetProducerOutput> {
    const producer = await this.producerRepository.findById(input.producerId);

    if (!producer) {
      throw new Error("Producer not found");
    }

    return producer;
  }
}
