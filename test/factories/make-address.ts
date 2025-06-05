import {
  Address,
  AddressProps,
} from "src/domain/entities/value-object/address";

export const makeAddress = (overrides: Partial<AddressProps> = {}): Address => {
  return Address.create({
    city: "São Paulo",
    state: "SP",
    ...overrides,
  });
};
