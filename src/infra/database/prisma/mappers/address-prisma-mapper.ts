import { Address as AddressPrisma, Prisma } from "@prisma/client";
import { Address } from "src/domain/entities/value-object/address";

export class AddressPrismaMapper {
  static toPrisma(address: Address): Prisma.AddressCreateInput {
    return {
      city: address.city,
      state: address.state,
    };
  }

  static toDomain(address: AddressPrisma): Address {
    return Address.create({ city: address.city, state: address.state });
  }
}
