import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import {
  PaginatedResult,
  PaginationParams,
} from "src/application/repositories/base";
import { ProducerRepository } from "src/application/repositories/producer-repository";
import { Producer } from "src/domain/entities/producer";
import { ProducerPrismaMapper } from "../mappers/producer-prisma-mapper";
import { PrismaService } from "../prisma.service";

@Injectable()
export class PrismaProducerRepository extends ProducerRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async create(raw: Producer): Promise<Producer> {
    const data = ProducerPrismaMapper.toPrisma(raw);
    await this.prisma.producer.create({ data });

    return raw;
  }

  async findById(id: string): Promise<Producer | null> {
    const producer = await this.prisma.producer.findUnique({ where: { id } });

    if (!producer) return null;

    return ProducerPrismaMapper.toDomain(producer);
  }

  async findAll(
    params: PaginationParams<
      Prisma.ProducerWhereInput,
      Prisma.ProducerOrderByWithRelationInput
    > = {},
  ): Promise<PaginatedResult<Producer>> {
    const { page = 1, perPage = 10, orderBy, where } = params;

    const total = await this.prisma.producer.count({ where });

    const producers = await this.prisma.producer.findMany({
      where,
      orderBy,
      take: perPage,
      skip: (page - 1) * perPage,
    });

    return {
      data: producers.map(ProducerPrismaMapper.toDomain),
      meta: {
        page,
        perPage,
        total,
        totalPages: Math.ceil(total / perPage),
      },
    };
  }

  async update(raw: Producer): Promise<void> {
    const data = ProducerPrismaMapper.toPrisma(raw);
    await this.prisma.producer.update({ where: { id: data.id }, data });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.producer.delete({ where: { id } });
  }
}
