export type CropProps = {
  name: string;
  year: number;
  production: number;
};

export class Crop {
  private constructor(private readonly props: CropProps) {
    this.validateName(props.name);
    this.validateProduction(props.production);
    this.validateYear(props.year);
    this.props = props;
  }

  static create(props: CropProps) {
    return new Crop(props);
  }

  get name() {
    return this.props.name;
  }

  get production() {
    return this.props.production;
  }

  get year() {
    return this.props.year;
  }

  get slug() {
    const name = this.name
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // delete accents
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "") // delete special chars
      .replace(/\s+/g, "-") // spaces -> hifen
      .replace(/-+/g, "-"); // replace multiple hyphens

    return `${name}-${this.year}`;
  }

  private validateName(name: string) {
    if (!name || name.trim().length < 2) {
      throw new Error("Name is required and must be at least 2 characters");
    }
  }

  private validateProduction(production: number) {
    if (production < 0) {
      throw new Error("Production must be greater than 0");
    }
  }

  private validateYear(year: number) {
    if (year <= 0) {
      throw new Error("Year must be greater than 0");
    }
  }
}
