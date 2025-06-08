import { Injectable, Logger } from "@nestjs/common";
import { Farm } from "src/domain/entities/farm";
import { PaginatedResult, PaginationParams } from "../repositories/base";
import { FarmRepository } from "../repositories/farm-repository";

export type ListFarmsInput = PaginationParams<unknown, unknown>;

export type ListFarmsOutput = PaginatedResult<Farm>;

@Injectable()
export class ListFarmsUseCase {
  private readonly logger = new Logger(ListFarmsUseCase.name);

  constructor(private farmRepository: FarmRepository) {}

  async execute(input: ListFarmsInput): Promise<ListFarmsOutput> {
    this.logger.log(`Listing farms with params: ${JSON.stringify(input)}`);

    try {
      const result = await this.farmRepository.findAll(input);
      this.logger.log(`Found ${result.data.length} farms`);
      return result;
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(`Error listing farms: ${error.message}`, error.stack);
      } else {
        this.logger.error("Unknown error listing farms");
      }
      throw error;
    }
  }
}
