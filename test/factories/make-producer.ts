import { Producer, ProducerProps } from "src/domain/entities/producer";
import { makeDocument } from "./make-document";

export const makeProducer = (
  overrides: Partial<ProducerProps> = {},
): Producer => {
  return Producer.create({
    name: "John Doe",
    document: makeDocument(),
    ...overrides,
  });
};
