import { randomUUID } from 'node:crypto';
import { Document } from './value-object/document';
import { Address } from './value-object/address';

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

  private validateName(name: string) {
    if (!name || name.trim().length < 2) {
      throw new Error('Name is required and must be at least 2 characters');
    }
  } 
}
