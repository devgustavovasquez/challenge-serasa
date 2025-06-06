import { Address as AddressPrisma, Farm as FarmPrisma } from "@prisma/client";
import { Farm } from "src/domain/entities/farm";
import { AddressPrismaMapper } from "./address-prisma-mapper";

export class FarmPrismaMapper {
  static toPrisma(farm: Farm, addressId: string): FarmPrisma {
    return {
      id: farm.id,
      addressId,
      producerId: farm.producerId,
      name: farm.name,
      totalArea: farm.totalArea,
      cultivatedArea: farm.cultivatedArea,
      vegetationArea: farm.vegetationArea,
      createdAt: farm.createdAt,
      updatedAt: farm.updatedAt ?? null,
    };
  }

  static toDomain(farm: FarmPrisma & { address: AddressPrisma }): Farm {
    return Farm.create(
      {
        name: farm.name,
        producerId: farm.producerId,
        address: AddressPrismaMapper.toDomain(farm.address),
        totalArea: farm.totalArea,
        cultivatedArea: farm.cultivatedArea,
        vegetationArea: farm.vegetationArea,
        createdAt: farm.createdAt,
        updatedAt: farm.updatedAt ?? undefined,
      },
      farm.id,
    );
  }
}
