import { Injectable, Logger } from "@nestjs/common";
import { NotFoundError } from "src/core/errors/not-found-error";
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

@Injectable()
export class UpdateFarmUseCase {
  private readonly logger = new Logger(UpdateFarmUseCase.name);

  constructor(
    private farmRepository: FarmRepository,
    private producerRepository: ProducerRepository,
  ) {}

  async execute(input: UpdateFarmInput): Promise<UpdateFarmOutput> {
    this.logger.log(`Updating farm with ID: ${input.id}`);

    try {
      const producer = await this.producerRepository.findById(input.producerId);
      if (!producer) {
        this.logger.warn(`Producer not found with ID: ${input.producerId}`);
        throw new NotFoundError("Producer not found");
      }

      const address = Address.create({ city: input.city, state: input.state });

      const farmExists = await this.farmRepository.findById(input.id);
      if (!farmExists) {
        this.logger.warn(`Farm not found with ID: ${input.id}`);
        throw new NotFoundError("Farm not found");
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
      this.logger.log(`Farm updated successfully: ${input.id}`);
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(`Error updating farm: ${error.message}`, error.stack);
      } else {
        this.logger.error("Unknown error updating farm");
      }
      throw error;
    }
  }
}
