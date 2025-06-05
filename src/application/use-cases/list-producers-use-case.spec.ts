import { makeProducer } from "test/factories/make-producer";
import { ProducerInMemoryRepository } from "test/repositories/producer-in-memory-repository";
import { ListProducersUseCase } from "./list-producers-use-case";

describe("ListProducerUseCase", () => {
  let producerRepository: ProducerInMemoryRepository;
  let sut: ListProducersUseCase;

  beforeEach(() => {
    producerRepository = new ProducerInMemoryRepository();
    sut = new ListProducersUseCase(producerRepository);
  });

  it("should list producers", async () => {
    const result = await sut.execute({});

    expect(result).toEqual({
      data: [],
      meta: {
        page: 1,
        perPage: 10,
        total: 0,
        totalPages: 0,
      },
    });
  });

  it("should list producers paginated", async () => {
    const producer = makeProducer();
    const producer2 = makeProducer();
    await producerRepository.create(producer);
    await producerRepository.create(producer2);

    const result = await sut.execute({
      page: 1,
      perPage: 1,
    });

    expect(result).toEqual({
      data: [producer],
      meta: {
        page: 1,
        perPage: 1,
        total: 2,
        totalPages: 2,
      },
    });
  });
});
