import { randomUUID } from "node:crypto";
import { Optional } from "../../utils/optional";
import { Address } from "./value-object/address";
import { Document } from "./value-object/document";

export type ProducerProps = {
  id: string;
  farmId?: string;
  name: string;
  address: Address;
  document: Document;
  createdAt: Date;
  updatedAt?: Date;
};

export class Producer {
  private constructor(private readonly props: ProducerProps) {
    this.validateName(props.name);
    this.props = props;
  }

  static create(
    props: Optional<Omit<ProducerProps, "id">, "createdAt">,
    id?: string,
  ) {
    return new Producer({
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

  get document() {
    return this.props.document;
  }

  get name() {
    return this.props.name;
  }

  get address() {
    return this.props.address;
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
}
