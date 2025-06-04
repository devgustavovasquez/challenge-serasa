import { randomUUID } from 'node:crypto';
import { Document } from './value-object/document';
import { Address } from './value-object/address';

export type ProducerProps = {
  id: string;
  farmId: string;
  name: string;
  address: Address;
  document: Document;
  createdAt: Date;
  updatedAt?: Date;
};

export class Producer {
  private constructor(private readonly props: ProducerProps) {
    this.props = props;
  }

  static create(props: Omit<ProducerProps, 'id' | 'createdAt'>) {
    return new Producer({
      ...props,
      id: randomUUID(),
      createdAt: new Date(),
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
}
