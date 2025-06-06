import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import {
  PaginatedResult,
  PaginationParams,
} from "src/application/repositories/base";
import { HarvestRepository } from "src/application/repositories/harvest-repository";
import { Harvest } from "src/domain/entities/harvest";
import { HarvestPrismaMapper } from "../mappers/harvest-prisma-mapper";
import { PrismaService } from "../prisma.service";

@Injectable()
export class PrismaHarvestRepository extends HarvestRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async create(raw: Harvest): Promise<Harvest> {
    const [harvest, crops] = HarvestPrismaMapper.toPrisma(raw);

    await this.prisma.harvest.create({
      data: {
        ...harvest,
        Crop: {
          create: crops,
        },
      },
    });

    return raw;
  }

  async findById(id: string): Promise<Harvest | null> {
    const harvest = await this.prisma.harvest.findUnique({
      where: { id },
      include: {
        Crop: true,
      },
    });

    if (!harvest) return null;

    return HarvestPrismaMapper.toDomain({
      ...harvest,
      crops: harvest.Crop,
    });
  }

  async findAll(
    params: PaginationParams<
      Prisma.HarvestWhereInput,
      Prisma.HarvestOrderByWithRelationInput
    > = {},
  ): Promise<PaginatedResult<Harvest>> {
    const { page = 1, perPage = 10, orderBy, where } = params;

    const total = await this.prisma.harvest.count({ where });

    const harvests = await this.prisma.harvest.findMany({
      where,
      orderBy,
      take: perPage,
      skip: (page - 1) * perPage,
      include: {
        Crop: true,
      },
    });

    return {
      data: harvests.map((harvest) =>
        HarvestPrismaMapper.toDomain({
          ...harvest,
          crops: harvest.Crop,
        }),
      ),
      meta: {
        page,
        perPage,
        total,
        totalPages: Math.ceil(total / perPage),
      },
    };
  }

  async update(raw: Harvest): Promise<void> {
    const [harvest, crops] = HarvestPrismaMapper.toPrisma(raw);

    await this.prisma.harvest.update({
      where: { id: harvest.id },
      data: {
        ...harvest,
        Crop: {
          deleteMany: {},
          create: crops,
        },
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.harvest.delete({ where: { id } });
  }
}
