import { Logger } from "@nestjs/common";
import { NotFoundError } from "src/core/errors/not-found-error";
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
  private readonly logger = new Logger(AddHarvestUseCase.name);

  constructor(
    private harvestRepository: HarvestRepository,
    private farmRepository: FarmRepository,
  ) {}

  async execute(input: AddHarvestInput): Promise<AddHarvestOutput> {
    this.logger.log(
      `Starting to add harvest for farmId=${input.farmId} and year=${input.year}`,
    );

    try {
      const farm = await this.farmRepository.findById(input.farmId);

      if (!farm) {
        this.logger.warn(`Farm with id=${input.farmId} not found`);
        throw new NotFoundError("Farm not found");
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

      this.logger.log(`Harvest created with id=${harvest.id}`);

      return harvest;
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(
          `Error adding harvest: ${error.message}`,
          error.stack,
        );
      } else {
        this.logger.error(`Unknown error adding harvest`);
      }

      throw error;
    }
  }
}
