import { Mock, vi } from "vitest";

import { Producer } from "src/domain/entities/producer";
import { makeProducer } from "test/factories/make-producer";
import { ProducerRepository } from "../repositories/producer-repository";
import { GetProducerUseCase } from "./get-producer-use-case";

describe("GetProducerUseCase", () => {
  let producerRepository: {
    findById: Mock;
  };
  let sut: GetProducerUseCase;
  const addedProducer = makeProducer();

  beforeEach(() => {
    producerRepository = {
      findById: vi.fn().mockResolvedValue(addedProducer),
    };
    sut = new GetProducerUseCase(
      producerRepository as unknown as ProducerRepository,
    );
  });

  it("should get a producer", async () => {
    const input = {
      producerId: addedProducer.id,
    };

    const producer = await sut.execute(input);

    expect(producer).toBeInstanceOf(Producer);
    expect(producer.id).toBeDefined();
    expect(producerRepository.findById).toHaveBeenCalledWith(input.producerId);
    expect(producerRepository.findById).toHaveBeenCalledTimes(1);
  });

  it("should throw an error if producer not found", async () => {
    producerRepository.findById.mockResolvedValueOnce(null);

    const input = {
      producerId: addedProducer.id,
    };

    const promise = sut.execute(input);

    await expect(promise).rejects.toThrow(new Error("Producer not found"));
  });
});
