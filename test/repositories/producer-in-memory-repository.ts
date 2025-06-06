import {
  PaginatedResult,
  PaginationParams,
} from "src/application/repositories/base";
import { ProducerRepository } from "src/application/repositories/producer-repository";
import { Producer } from "src/domain/entities/producer";

export class ProducerInMemoryRepository implements ProducerRepository {
  producers: Producer[] = [];

  async create(producer: Producer): Promise<Producer> {
    this.producers.push(producer);
    return producer;
  }

  async findById(id: string): Promise<Producer | null> {
    return this.producers.find((producer) => producer.id === id) ?? null;
  }

  async findAll(
    params: PaginationParams<unknown, unknown>,
  ): Promise<PaginatedResult<Producer>> {
    const { page = 1, perPage = 10, orderBy, where } = params;

    let filteredProducers = [...this.producers];

    if (where) {
      filteredProducers = filteredProducers.filter((producer) => {
        return Object.entries(where).every(([key, value]) => {
          const field = producer[key as keyof Producer];

          return field === value;
        });
      });
    }

    if (orderBy) {
      filteredProducers = filteredProducers.sort((a, b) => {
        const aValue = a[orderBy as keyof Producer];
        const bValue = b[orderBy as keyof Producer];

        if (aValue === undefined || bValue === undefined) return 0;

        if (typeof aValue === "string" && typeof bValue === "string") {
          return aValue.localeCompare(bValue);
        }

        if (typeof aValue === "number" && typeof bValue === "number") {
          return aValue - bValue;
        }

        if (aValue instanceof Date && bValue instanceof Date) {
          return aValue.getTime() - bValue.getTime();
        }

        return 0;
      });
    }

    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
    const paginatedProducers = filteredProducers.slice(startIndex, endIndex);

    return {
      data: paginatedProducers,
      meta: {
        total: filteredProducers.length,
        page,
        perPage,
        totalPages: Math.ceil(filteredProducers.length / perPage),
      },
    };
  }

  async update(producer: Producer): Promise<void> {
    const producerIndex = this.producers.findIndex((p) => p.id === producer.id);
    this.producers[producerIndex] = producer;
  }

  async delete(id: string): Promise<void> {
    this.producers = this.producers.filter((producer) => producer.id !== id);
  }
}
