import { Farm, FarmProps } from "src/domain/entities/farm";
import { makeAddress } from "./make-address";

export const makeFarm = (overrides: Partial<FarmProps> = {}): Farm => {
  return Farm.create({
    name: "Farm 1",
    producerId: "producer-id",
    address: makeAddress(),
    totalArea: 100,
    cultivatedArea: 50,
    vegetationArea: 50,
    ...overrides,
  });
};
