import { Producer as ProducerPrisma } from "@prisma/client";
import { Producer } from "src/domain/entities/producer";
import { Document } from "src/domain/entities/value-object/document";

export class ProducerPrismaMapper {
  static toPrisma(producer: Producer): ProducerPrisma {
    return {
      id: producer.id,
      name: producer.name,
      document: producer.document.value,
      createdAt: producer.createdAt,
      updatedAt: producer.updatedAt ?? null,
    };
  }

  static toDomain(producer: ProducerPrisma): Producer {
    return Producer.create(
      {
        name: producer.name,
        document: Document.create(producer.document),
        createdAt: producer.createdAt,
        updatedAt: producer.updatedAt ?? undefined,
      },
      producer.id,
    );
  }
}
