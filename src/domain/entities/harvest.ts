import { randomUUID } from "node:crypto";
import { Optional } from "src/utils/optional";
import { Crop } from "./value-object/crop";

export type HarvestProps = {
  id: string;
  farmId: string;
  crops: Crop[];
  year: number;
  createdAt: Date;
  updatedAt?: Date;
};

export class Harvest {
  private constructor(private readonly props: HarvestProps) {
    this.props = props;
  }

  static create(
    props: Optional<Omit<HarvestProps, "id">, "createdAt">,
    id?: string,
  ) {
    return new Harvest({
      ...props,
      id: id ?? randomUUID(),
      createdAt: props.createdAt ?? new Date(),
    });
  }

  get id() {
    return this.props.id;
  }

  get farmId() {
    return this.props.farmId;
  }

  get crops() {
    return this.props.crops;
  }

  get year() {
    return this.props.year;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }
}
