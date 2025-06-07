import { Producer } from "src/domain/entities/producer";

export class ProducerViewModel {
  static toHTTP(producer: Producer) {
    return {
      id: producer.id,
      name: producer.name,
      document: producer.document.value,
      createdAt: producer.createdAt,
      updatedAt: producer.updatedAt,
    };
  }
}
