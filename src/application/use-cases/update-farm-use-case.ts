import { Farm } from "src/domain/entities/farm";
import { Address } from "src/domain/entities/value-object/address";
import { FarmRepository } from "../repositories/farm-repository";
import { ProducerRepository } from "../repositories/producer-repository";

export type UpdateFarmInput = {
  id: string;
  producerId: string;
  name: string;
  city: string;
  state: string;
  totalArea: number;
  cultivatedArea: number;
  vegetationArea: number;
};

export type UpdateFarmOutput = void;

export class UpdateFarmUseCase {
  constructor(
    private farmRepository: FarmRepository,
    private producerRepository: ProducerRepository,
  ) {}

  async execute(input: UpdateFarmInput): Promise<UpdateFarmOutput> {
    const producer = await this.producerRepository.findById(input.producerId);

    if (!producer) {
      throw new Error("Producer not found");
    }

    const address = Address.create({ city: input.city, state: input.state });

    const farmExists = await this.farmRepository.findById(input.id);

    if (!farmExists) {
      throw new Error("Farm not found");
    }

    const farm = Farm.create(
      {
        ...input,
        address,
        updatedAt: new Date(),
        createdAt: farmExists.createdAt,
      },
      input.id,
    );

    await this.farmRepository.update(farm);
  }
}
