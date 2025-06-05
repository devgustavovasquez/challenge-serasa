import { Producer, ProducerProps } from "src/domain/entities/producer";
import { makeAddress } from "./make-address";
import { makeDocument } from "./make-document";

export const makeProducer = (
  overrides: Partial<ProducerProps> = {},
): Producer => {
  return Producer.create({
    name: "John Doe",
    document: makeDocument(),
    address: makeAddress(),
    ...overrides,
  });
};
