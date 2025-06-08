import { randomUUID } from "node:crypto";
import { ValidationError } from "src/core/errors/validation-error";
import { Optional } from "../../utils/optional";
import { Document } from "./value-object/document";

export type ProducerProps = {
  id: string;
  name: string;
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

  get document() {
    return this.props.document;
  }

  get name() {
    return this.props.name;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  private validateName(name: string) {
    if (!name || name.trim().length < 2) {
      throw new ValidationError(
        "Name is required and must be at least 2 characters",
      );
    }
  }
}
