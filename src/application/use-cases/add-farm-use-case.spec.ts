import { Mock, vi } from "vitest";

import { Farm } from "src/domain/entities/farm";
import { makeProducer } from "test/factories/make-producer";
import { FarmRepository } from "../repositories/farm-repository";
import { ProducerRepository } from "../repositories/producer-repository";
import { AddFarmUseCase } from "./add-farm-use-case";

describe("AddFarmUseCase", () => {
  let farmRepository: {
    create: Mock;
  };
  let producerRepository: {
    findById: Mock;
  };
  let sut: AddFarmUseCase;

  const producer = makeProducer();

  beforeEach(() => {
    farmRepository = {
      create: vi.fn().mockResolvedValue(undefined),
    };
    producerRepository = {
      findById: vi.fn().mockResolvedValue(producer),
    };
    sut = new AddFarmUseCase(
      farmRepository as unknown as FarmRepository,
      producerRepository as unknown as ProducerRepository,
    );
  });

  it("should add a farm", async () => {
    const input = {
      producerId: producer.id,
      name: "any_name",
      city: "São Paulo",
      state: "SP",
      totalArea: 100,
      cultivatedArea: 50,
      vegetationArea: 50,
    };

    const farm = await sut.execute(input);

    expect(farm).toBeInstanceOf(Farm);
    expect(farm.id).toBeDefined();
    expect(farmRepository.create).toHaveBeenCalledWith(expect.any(Farm));
    expect(farmRepository.create).toHaveBeenCalledTimes(1);
    expect(producerRepository.findById).toHaveBeenCalledWith(producer.id);
  });

  it("should throw an error if producer not found", async () => {
    producerRepository.findById.mockResolvedValueOnce(null);

    const input = {
      producerId: producer.id,
      name: "any_name",
      city: "São Paulo",
      state: "SP",
      totalArea: 100,
      cultivatedArea: 50,
      vegetationArea: 50,
    };

    const promise = sut.execute(input);

    await expect(promise).rejects.toThrow(new Error("Producer not found"));
  });
});
