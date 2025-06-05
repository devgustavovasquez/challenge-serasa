import { Harvest } from "src/domain/entities/harvest";

export abstract class HarvestRepository {
  abstract create(harvest: Harvest): Promise<void>;
  abstract findById(id: string): Promise<Harvest | null>;
  abstract update(harvest: Harvest): Promise<void>;
  abstract delete(id: string): Promise<void>;
}
