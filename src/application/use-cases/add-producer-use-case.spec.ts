import { vi } from "vitest";

import { Producer } from "src/domain/entities/producer";
import { AddProducerUseCase } from "./add-producer-use-case";

describe("AddProducerUseCase", () => {
  let producerRepository: any;
  let sut: AddProducerUseCase;

  beforeEach(() => {
    producerRepository = { create: vi.fn() };
    sut = new AddProducerUseCase(producerRepository);
  });

  it("should add a producer", async () => {
    const input = {
      name: "any_name",
      document: "589.491.301-22",
      state: "DF",
      city: "any_city",
    };

    const producer = await sut.execute(input);

    expect(producer).toBeInstanceOf(Producer);
    expect(producer.id).toBeDefined();
    expect(producerRepository.create).toHaveBeenCalledWith(
      expect.any(Producer)
    );
    expect(producerRepository.create).toHaveBeenCalledTimes(1);
  });

  it("shoul add a producer with cnpj", async () => {
    const input = {
      name: "any_name",
      document: "27.865.757/0001-02",
      state: "DF",
      city: "any_city",
    };

    const producer = await sut.execute(input);

    expect(producer).toBeInstanceOf(Producer);
    expect(producer.id).toBeDefined();
    expect(producerRepository.create).toHaveBeenCalledWith(
      expect.any(Producer)
    );
    expect(producerRepository.create).toHaveBeenCalledTimes(1);
  });

  it("should throw an error if producer name is missing", async () => {
    const input = {
      name: "",
      document: "589.491.301-22",
      state: "DF",
      city: "any_city",
    };

    await expect(sut.execute(input)).rejects.toThrow(new Error("Name is required and must be at least 2 characters"));
  });

  it("should throw an error if producer document is invalid", async () => {
    const input = {
      name: "any_name",
      document: "any_document",
      state: "DF",
      city: "any_city",
    };

    await expect(sut.execute(input)).rejects.toThrow(new Error("Invalid Document"));
  });

  it("should throw an error if producer state is invalid", async () => {
    const input = {
      name: "any_name",
      document: "589.491.301-22",
      state: "any_state",
      city: "any_city",
    };

    await expect(sut.execute(input)).rejects.toThrow(new Error("State is invalid or missing"));
  });

  it("should throw an error if producer repository throws", async () => {
    producerRepository.create.mockRejectedValueOnce(new Error("any_error"));

    const input = {
      name: "any_name",
      document: "589.491.301-22",
      state: "DF",
      city: "any_city",
    };

    await expect(sut.execute(input)).rejects.toThrow(new Error("any_error"));
  });


});
