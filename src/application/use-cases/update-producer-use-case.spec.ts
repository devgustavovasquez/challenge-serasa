import { makeProducer } from "test/factories/make-producer";
import { ProducerInMemoryRepository } from "test/repositories/producer-in-memory-repository";
import { UpdateProducerUseCase } from "./update-producer-use-case";

describe("UpdateProducerUseCase", () => {
  let producerRepository: ProducerInMemoryRepository;
  let sut: UpdateProducerUseCase;

  beforeEach(() => {
    producerRepository = new ProducerInMemoryRepository();
    sut = new UpdateProducerUseCase(producerRepository);
  });

  it("should update a producer", async () => {
    const producer = makeProducer();
    await producerRepository.create(producer);

    const input = {
      id: producer.id,
      name: "any_name",
      document: "589.491.301-22",
    };

    await sut.execute(input);

    expect(producerRepository.producers[0].name).toBe("any_name");
    expect(producerRepository.producers[0].document.value).toBe("58949130122");
    expect(producerRepository.producers[0].updatedAt).toBeInstanceOf(Date);
    expect(producerRepository.producers[0].createdAt).toBe(producer.createdAt);
  });

  it("should throw an error if producer not found", async () => {
    const input = {
      id: "producer_id",
      name: "any_name",
      document: "589.491.301-22",
      state: "DF",
      city: "any_city",
    };

    await expect(sut.execute(input)).rejects.toThrow(
      new Error("Producer not found"),
    );
  });
});
