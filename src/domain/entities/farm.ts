import { randomUUID } from "node:crypto";
import { Optional } from "../../utils/optional";
import { Address } from "./value-object/address";

export type FarmProps = {
  id: string;
  producerId: string;
  name: string;
  address: Address;
  totalArea: number;
  cultivatedArea: number;
  vegetationArea: number;
  createdAt: Date;
  updatedAt?: Date;
};

export class Farm {
  private constructor(private readonly props: FarmProps) {
    this.validateAreas(
      props.totalArea,
      props.cultivatedArea,
      props.vegetationArea,
    );
    this.validateName(props.name);
    this.props = props;
  }

  static create(
    props: Optional<Omit<FarmProps, "id">, "createdAt">,
    id?: string,
  ) {
    return new Farm({
      ...props,
      id: id ?? randomUUID(),
      createdAt: props.createdAt ?? new Date(),
    });
  }

  get id() {
    return this.props.id;
  }

  get producerId() {
    return this.props.producerId;
  }

  get name() {
    return this.props.name;
  }

  get address() {
    return this.props.address;
  }

  get totalArea() {
    return this.props.totalArea;
  }

  get cultivatedArea() {
    return this.props.cultivatedArea;
  }

  get vegetationArea() {
    return this.props.vegetationArea;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  private validateName(name: string) {
    if (!name || name.trim().length < 2) {
      throw new Error("Name is required and must be at least 2 characters");
    }
  }

  private validateAreas(
    totalArea: number,
    cultivatedArea: number,
    vegetationArea: number,
  ) {
    if (totalArea <= 0) {
      throw new Error("Total area must be greater than 0");
    }

    if (Math.sign(cultivatedArea) < 0) {
      throw new Error("Cultivated area must be greater or equal to 0");
    }

    if (Math.sign(vegetationArea) < 0) {
      throw new Error("Vegetation area must be greater or equal to 0");
    }

    if (totalArea < cultivatedArea + vegetationArea) {
      throw new Error("Total area must be greater than cultivated area");
    }
  }
}
