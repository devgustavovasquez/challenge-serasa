import { Farm } from "src/domain/entities/farm";

export class FarmViewModel {
  static toHTTP(farm: Farm) {
    return {
      id: farm.id,
      producerId: farm.producerId,
      name: farm.name,
      totalArea: farm.totalArea,
      cultivatedArea: farm.cultivatedArea,
      vegetationArea: farm.vegetationArea,
      city: farm.address.city,
      state: farm.address.state,
      createdAt: farm.createdAt,
      updatedAt: farm.updatedAt,
    };
  }
}
