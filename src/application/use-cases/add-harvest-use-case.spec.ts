import { Mock, vi } from "vitest";

import { Harvest } from "src/domain/entities/harvest";
import { makeFarm } from "test/factories/make-farm";
import { FarmRepository } from "../repositories/farm-repository";
import { HarvestRepository } from "../repositories/harvest-repository";
import { AddHarvestUseCase } from "./add-harvest-use-case";

describe("AddHarvestUseCase", () => {
  let harvestRepository: {
    create: Mock;
  };
  let farmRepository: {
    findById: Mock;
  };
  let sut: AddHarvestUseCase;

  const farm = makeFarm();

  beforeEach(() => {
    harvestRepository = {
      create: vi.fn().mockResolvedValue(undefined),
    };
    farmRepository = {
      findById: vi.fn().mockResolvedValue(farm),
    };
    sut = new AddHarvestUseCase(
      harvestRepository as unknown as HarvestRepository,
      farmRepository as unknown as FarmRepository,
    );
  });

  it("should add a harvest", async () => {
    const input = {
      farmId: farm.id,
      crops: [
        { name: "any_name", production: 100, year: 2022 },
        { name: "any_name", production: 100, year: 2022 },
      ],
      year: 2022,
    };

    const harvest = await sut.execute(input);

    expect(harvest).toBeInstanceOf(Harvest);
    expect(harvest.id).toBeDefined();
    expect(harvestRepository.create).toHaveBeenCalledWith(expect.any(Harvest));
    expect(harvestRepository.create).toHaveBeenCalledTimes(1);
    expect(farmRepository.findById).toHaveBeenCalledWith(farm.id);
  });

  it("should add a harvest without crops", async () => {
    const input = {
      farmId: farm.id,
      crops: [],
      year: 2022,
    };

    const harvest = await sut.execute(input);

    expect(harvest).toBeInstanceOf(Harvest);
    expect(harvest.id).toBeDefined();
    expect(harvest.crops).toHaveLength(0);
    expect(harvestRepository.create).toHaveBeenCalledTimes(1);
  });

  it("should throw an error if farm not found", async () => {
    const input = {
      farmId: "any_id",
      crops: [
        { name: "any_name", production: 100, year: 2022 },
        { name: "any_name", production: 100, year: 2022 },
      ],
      year: 2022,
    };

    farmRepository.findById.mockResolvedValueOnce(null);

    const promise = sut.execute(input);

    await expect(promise).rejects.toThrow(new Error("Farm not found"));
  });
});
