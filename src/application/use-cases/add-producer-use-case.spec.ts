import { Mock, vi } from "vitest";

import { ValidationError } from "src/core/errors/validation-error";
import { Producer } from "src/domain/entities/producer";
import { ProducerRepository } from "../repositories/producer-repository";
import { AddProducerUseCase } from "./add-producer-use-case";

describe("AddProducerUseCase", () => {
  let producerRepository: {
    create: Mock;
  };
  let sut: AddProducerUseCase;

  beforeEach(() => {
    producerRepository = {
      create: vi.fn().mockResolvedValue(undefined),
    };
    sut = new AddProducerUseCase(
      producerRepository as unknown as ProducerRepository,
    );
  });

  it("should add a producer", async () => {
    const input = {
      name: "any_name",
      document: "589.491.301-22",
    };

    const producer = await sut.execute(input);

    expect(producer).toBeInstanceOf(Producer);
    expect(producer.id).toBeDefined();
    expect(producerRepository.create).toHaveBeenCalledWith(
      expect.any(Producer),
    );
    expect(producerRepository.create).toHaveBeenCalledTimes(1);
  });

  it("shoul add a producer with cnpj", async () => {
    const input = {
      name: "any_name",
      document: "27.865.757/0001-02",
    };

    const producer = await sut.execute(input);

    expect(producer).toBeInstanceOf(Producer);
    expect(producer.id).toBeDefined();
    expect(producerRepository.create).toHaveBeenCalledWith(
      expect.any(Producer),
    );
    expect(producerRepository.create).toHaveBeenCalledTimes(1);
  });

  it("should throw an error if producer name is missing", async () => {
    const input = {
      name: "",
      document: "589.491.301-22",
    };

    await expect(sut.execute(input)).rejects.toThrow(ValidationError);
  });

  it("should throw an error if producer document is invalid", async () => {
    const input = {
      name: "any_name",
      document: "any_document",
    };

    await expect(sut.execute(input)).rejects.toThrow(ValidationError);
  });
});
