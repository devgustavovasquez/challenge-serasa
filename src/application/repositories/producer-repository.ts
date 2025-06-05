import { Producer } from "src/domain/entities/producer";

export abstract class ProducerRepository {
  abstract create(producer: Producer): Promise<void>;
  abstract findById(id: string): Promise<Producer | null>;
  abstract update(producer: Producer): Promise<void>;
  abstract delete(id: string): Promise<void>;
}