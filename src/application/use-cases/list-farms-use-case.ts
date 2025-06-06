import { Injectable } from "@nestjs/common";
import { Farm } from "src/domain/entities/farm";
import { PaginatedResult, PaginationParams } from "../repositories/base";
import { FarmRepository } from "../repositories/farm-repository";

export type ListFarmsInput = PaginationParams<unknown, unknown>;

export type ListFarmsOutput = PaginatedResult<Farm>;

@Injectable()
export class ListFarmsUseCase {
  constructor(private farmRepository: FarmRepository) {}

  async execute(input: ListFarmsInput): Promise<ListFarmsOutput> {
    return await this.farmRepository.findAll(input);
  }
}
