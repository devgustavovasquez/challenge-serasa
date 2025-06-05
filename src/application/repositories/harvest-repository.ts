import { Harvest } from "src/domain/entities/harvest";
import { BaseRepository } from "./base";

export abstract class HarvestRepository extends BaseRepository<Harvest> {}
