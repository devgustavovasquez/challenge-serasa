import { Crop as CropPrisma, Harvest as HarvestPrisma } from "@prisma/client";
import { randomUUID } from "node:crypto";
import { Harvest } from "src/domain/entities/harvest";
import { Crop } from "src/domain/entities/value-object/crop";

export class HarvestPrismaMapper {
  static toPrisma(harvest: Harvest): [HarvestPrisma, CropPrisma[]] {
    return [
      {
        id: harvest.id,
        farmId: harvest.farmId,
        year: harvest.year,
        createdAt: harvest.createdAt,
        updatedAt: harvest.updatedAt ?? null,
      },
      harvest.crops.map((crop) => {
        return {
          id: randomUUID(),
          harvestId: harvest.id,
          name: crop.name,
          production: crop.production,
          slug: crop.slug,
        };
      }),
    ];
  }

  static toDomain(harvest: HarvestPrisma & { crops: CropPrisma[] }): Harvest {
    return Harvest.create(
      {
        farmId: harvest.farmId,
        crops: harvest.crops.map((crop) => {
          return Crop.create({
            name: crop.name,
            year: harvest.year,
            production: crop.production,
          });
        }),
        year: harvest.year,
        createdAt: harvest.createdAt,
        updatedAt: harvest.updatedAt ?? undefined,
      },
      harvest.id,
    );
  }
}
