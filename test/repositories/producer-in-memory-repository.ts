import { ProducerRepository } from "src/application/repositories/producer-repository";
import { Producer } from "src/domain/entities/producer";

export class ProducerInMemoryRepository implements ProducerRepository {
  producers: Producer[] = [];

  async create(producer: Producer): Promise<void> {
    this.producers.push(producer);
  }

  async findById(id: string): Promise<Producer | null> {
    return this.producers.find((producer) => producer.id === id) ?? null;
  }

  async update(producer: Producer): Promise<void> {
    const producerIndex = this.producers.findIndex((p) => p.id === producer.id);
    this.producers[producerIndex] = producer;
  }

  async delete(id: string): Promise<void> {
    this.producers = this.producers.filter((producer) => producer.id !== id);
  }
}
