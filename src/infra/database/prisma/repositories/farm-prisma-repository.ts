import { Prisma } from "@prisma/client";
import {
  PaginatedResult,
  PaginationParams,
} from "src/application/repositories/base";
import { FarmRepository } from "src/application/repositories/farm-repository";
import { Farm } from "src/domain/entities/farm";
import { AddressPrismaMapper } from "../mappers/address-prisma-mapper";
import { FarmPrismaMapper } from "../mappers/farm-prisma-mapper";
import { PrismaService } from "../prisma.service";

export class PrismaFarmRepository extends FarmRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async create(raw: Farm): Promise<Farm> {
    const address = AddressPrismaMapper.toPrisma(raw.address);

    await this.prisma.$transaction(async (tx) => {
      const addressPrisma = await tx.address.create({ data: address });

      const farm = FarmPrismaMapper.toPrisma(raw, addressPrisma.id);

      await tx.farm.create({ data: farm });
    });

    return raw;
  }

  async findById(id: string): Promise<Farm | null> {
    const farm = await this.prisma.farm.findUnique({
      where: { id },
      include: {
        address: true,
      },
    });

    if (!farm) return null;

    return FarmPrismaMapper.toDomain(farm);
  }

  async findAll(
    params: PaginationParams<
      Prisma.FarmWhereInput,
      Prisma.FarmOrderByWithRelationInput
    > = {},
  ): Promise<PaginatedResult<Farm>> {
    const { page = 1, perPage = 10, orderBy, where } = params;

    const total = await this.prisma.farm.count({ where });

    const farms = await this.prisma.farm.findMany({
      where,
      orderBy,
      take: perPage,
      skip: (page - 1) * perPage,
      include: {
        address: true,
      },
    });

    return {
      data: farms.map(FarmPrismaMapper.toDomain),
      meta: {
        page,
        perPage,
        total,
        totalPages: Math.ceil(total / perPage),
      },
    };
  }

  async update(raw: Farm): Promise<void> {
    await this.prisma.$transaction(async (tx) => {
      const farm = await tx.farm.findUniqueOrThrow({
        where: { id: raw.id },
        select: { addressId: true },
      });

      const address = AddressPrismaMapper.toPrisma(raw.address);
      await tx.address.update({
        where: { id: farm.addressId },
        data: {
          city: address.city,
          state: address.state,
          updatedAt: new Date(),
        },
      });

      const farmData = FarmPrismaMapper.toPrisma(raw, farm.addressId);
      await tx.farm.update({
        where: { id: raw.id },
        data: {
          name: farmData.name,
          totalArea: farmData.totalArea,
          cultivatedArea: farmData.cultivatedArea,
          vegetationArea: farmData.vegetationArea,
          updatedAt: new Date(),
        },
      });
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.farm.delete({ where: { id } });
  }
}
