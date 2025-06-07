import { Harvest } from "src/domain/entities/harvest";

export class HarvestViewModel {
  static toHTTP(harvest: Harvest) {
    return {
      id: harvest.id,
      farmId: harvest.farmId,
      year: harvest.year,
      crops: harvest.crops.map((crop) => {
        return {
          name: crop.name,
          production: crop.production,
          slug: crop.slug,
          year: crop.year,
        };
      }),
      createdAt: harvest.createdAt,
      updatedAt: harvest.updatedAt,
    };
  }
}
