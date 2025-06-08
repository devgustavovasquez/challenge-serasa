import { NotFoundError } from "src/core/errors/not-found-error";
import { makeFarm } from "test/factories/make-farm";
import { makeProducer } from "test/factories/make-producer";
import { FarmInMemoryRepository } from "test/repositories/farm-in-memory-repository";
import { Mock } from "vitest";
import { ProducerRepository } from "../repositories/producer-repository";
import { UpdateFarmUseCase } from "./update-farm-use-case";

describe("UpdateFarmUseCase", () => {
  let farmRepository: FarmInMemoryRepository;
  let producerRepository: {
    findById: Mock;
  };
  let sut: UpdateFarmUseCase;

  beforeEach(() => {
    farmRepository = new FarmInMemoryRepository();
    producerRepository = {
      findById: vi.fn().mockResolvedValue(undefined),
    };
    sut = new UpdateFarmUseCase(
      farmRepository,
      producerRepository as unknown as ProducerRepository,
    );
  });

  it("should update a farm", async () => {
    const producer = makeProducer();
    producerRepository.findById.mockResolvedValue(producer);

    const farm = makeFarm({ producerId: producer.id });
    await farmRepository.create(farm);

    const input = {
      id: farm.id,
      producerId: farm.producerId,
      name: "any_name",
      city: "São Paulo",
      state: "SP",
      totalArea: 300,
      cultivatedArea: 10,
      vegetationArea: 20,
    };

    await sut.execute(input);

    expect(farmRepository.farms[0].name).toBe("any_name");
    expect(farmRepository.farms[0].address.city).toBe("São Paulo");
    expect(farmRepository.farms[0].address.state).toBe("SP");
    expect(farmRepository.farms[0].totalArea).toBe(300);
    expect(farmRepository.farms[0].cultivatedArea).toBe(10);
    expect(farmRepository.farms[0].vegetationArea).toBe(20);
    expect(farmRepository.farms[0].updatedAt).toBeInstanceOf(Date);
    expect(farmRepository.farms[0].createdAt).toBe(farm.createdAt);
  });

  it("should throw an error if producer not found", async () => {
    const farm = makeFarm();
    await farmRepository.create(farm);

    const input = {
      id: farm.id,
      producerId: farm.producerId,
      name: "any_name",
      city: "São Paulo",
      state: "SP",
      totalArea: 300,
      cultivatedArea: 10,
      vegetationArea: 20,
    };

    await expect(() => sut.execute(input)).rejects.toThrow(NotFoundError);
  });

  it("should throw an error if farm not found", async () => {
    const producer = makeProducer();
    producerRepository.findById.mockResolvedValue(producer);

    const input = {
      id: "any_id",
      producerId: producer.id,
      name: "any_name",
      city: "São Paulo",
      state: "SP",
      totalArea: 300,
      cultivatedArea: 10,
      vegetationArea: 20,
    };

    await expect(() => sut.execute(input)).rejects.toThrow(NotFoundError);
  });
});
