import { Injectable, Logger } from "@nestjs/common";
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
  private readonly logger = new Logger(AddFarmUseCase.name);

  constructor(
    private farmRepository: FarmRepository,
    private producerRepository: ProducerRepository,
  ) {}

  async execute(input: AddFarmInput): Promise<AddFarmOutput> {
    this.logger.log(`Starting to add farm for producerId=${input.producerId}`);

    try {
      const address = Address.create({ city: input.city, state: input.state });

      const producer = await this.producerRepository.findById(input.producerId);

      if (!producer) {
        this.logger.warn(`Producer with id=${input.producerId} not found`);
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

      this.logger.log(`Farm created with id=${farm.id}`);

      return farm;
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(`Error adding farm: ${error.message}`, error.stack);
      } else {
        this.logger.error(`Unknown error adding farm`);
      }

      throw error;
    }
  }
}
