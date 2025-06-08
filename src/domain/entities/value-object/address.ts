import { ValidationError } from "src/core/errors/validation-error";
import { UFS } from "../../enums/ufs";

export type AddressProps = {
  city: string;
  state: string;
};

export class Address {
  private constructor(private readonly props: AddressProps) {
    this.props = props;
  }

  static create(props: AddressProps) {
    const { city, state } = props;

    if (!city || city.trim().length < 2) {
      throw new ValidationError(
        "City is required and must be at least 2 characters",
      );
    }

    if (!state || !UFS.includes(state.toUpperCase())) {
      throw new ValidationError("State is invalid or missing");
    }

    return new Address(props);
  }

  get city() {
    return this.props.city;
  }

  get state() {
    return this.props.state;
  }
}
