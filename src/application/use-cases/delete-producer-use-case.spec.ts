import { makeProducer } from "test/factories/make-producer";
import { ProducerInMemoryRepository } from "test/repositories/producer-in-memory-repository";
import { DeleteProducerUseCase } from "./delete-producer-use-case";

describe("DeleteProducerUseCase", () => {
  let producerRepository: ProducerInMemoryRepository;
  let sut: DeleteProducerUseCase;

  beforeEach(() => {
    producerRepository = new ProducerInMemoryRepository();
    sut = new DeleteProducerUseCase(producerRepository);
  });

  it("should delete a producer", async () => {
    const producer = makeProducer();
    await producerRepository.create(producer);

    const input = {
      id: producer.id,
    };

    await sut.execute(input);

    expect(producerRepository.producers).toHaveLength(0);
  });

  it("should throw an error if producer not found", async () => {
    const input = {
      id: "any_id",
    };

    await expect(sut.execute(input)).rejects.toThrow(
      new Error("Producer not found"),
    );
  });
});
