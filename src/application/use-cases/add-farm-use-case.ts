import { Injectable } from "@nestjs/common";
import { Farm } from "src/domain/entities/farm";
import { Address } from "src/domain/entities/value-object/address";
import { FarmRepository } from "../repositories/farm-repository";
import { ProducerRepository } from "../repositories/producer-repository";

export type AddFarmInput = {
  producerId: string;
  name: string;
  city: string;
  state: string;
  totalArea: number;
  cultivatedArea: number;
  vegetationArea: number;
};

export type AddFarmOutput = Farm;

@Injectable()
export class AddFarmUseCase {
  constructor(
    private farmRepository: FarmRepository,
    private producerRepository: ProducerRepository,
  ) {}

  async execute(input: AddFarmInput): Promise<AddFarmOutput> {
    const address = Address.create({ city: "São Paulo", state: "SP" });

    const producer = await this.producerRepository.findById(input.producerId);

    if (!producer) {
      throw new Error("Producer not found");
    }

    const farm = Farm.create({
      producerId: input.producerId,
      name: input.name,
      address,
      totalArea: input.totalArea,
      cultivatedArea: input.cultivatedArea,
      vegetationArea: input.vegetationArea,
    });

    await this.farmRepository.create(farm);

    return farm;
  }
}
