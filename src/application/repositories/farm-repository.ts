import { Farm } from "src/domain/entities/farm";

export abstract class FarmRepository {
  abstract create(farm: Farm): Promise<void>;
  abstract findById(id: string): Promise<Farm | null>;
  abstract update(farm: Farm): Promise<void>;
  abstract delete(id: string): Promise<void>;
}
