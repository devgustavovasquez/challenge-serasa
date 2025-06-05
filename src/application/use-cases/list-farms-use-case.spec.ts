import { makeFarm } from "test/factories/make-farm";
import { FarmInMemoryRepository } from "test/repositories/farm-in-memory-repository";
import { ListFarmsUseCase } from "./list-farms-use-case";

describe("ListFarmsUseCase", () => {
  let farmRepository: FarmInMemoryRepository;
  let sut: ListFarmsUseCase;

  beforeEach(() => {
    farmRepository = new FarmInMemoryRepository();
    sut = new ListFarmsUseCase(farmRepository);
  });

  it("should list farms", async () => {
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

  it("should list farms paginated", async () => {
    const farm = makeFarm();
    const farm2 = makeFarm();
    await farmRepository.create(farm);
    await farmRepository.create(farm2);

    const result = await sut.execute({
      page: 1,
      perPage: 1,
    });

    expect(result).toEqual({
      data: [farm],
      meta: {
        page: 1,
        perPage: 1,
        total: 2,
        totalPages: 2,
      },
    });
  });
});
