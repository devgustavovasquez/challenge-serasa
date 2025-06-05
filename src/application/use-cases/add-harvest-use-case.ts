import { Harvest } from "src/domain/entities/harvest";
import { Crop } from "src/domain/entities/value-object/crop";
import { FarmRepository } from "../repositories/farm-repository";
import { HarvestRepository } from "../repositories/harvest-repository";

export type AddHarvestInput = {
  farmId: string;
  crops: {
    name: string;
    production: number;
  }[];
  year: number;
};

export type AddHarvestOutput = Harvest;

export class AddHarvestUseCase {
  constructor(
    private harvestRepository: HarvestRepository,
    private farmRepository: FarmRepository,
  ) {}

  async execute(input: AddHarvestInput): Promise<AddHarvestOutput> {
    const farm = await this.farmRepository.findById(input.farmId);

    if (!farm) {
      throw new Error("Farm not found");
    }

    const crops = input.crops.map((crop) =>
      Crop.create({
        name: crop.name,
        year: input.year,
        production: crop.production,
      }),
    );

    const harvest = Harvest.create({
      farmId: input.farmId,
      crops,
      year: input.year,
    });

    await this.harvestRepository.create(harvest);

    return harvest;
  }
}
