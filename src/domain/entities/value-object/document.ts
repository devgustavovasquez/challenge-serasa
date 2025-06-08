import { ValidationError } from "src/core/errors/validation-error";
import { DocumentValidator } from "../../validators/document-validator";

export class Document {
  private readonly _value: string;

  private constructor(value: string) {
    this._value = value;
  }

  static create(value: string): Document {
    const cleaned = DocumentValidator.format(value);

    if (!DocumentValidator.isValid(cleaned)) {
      throw new ValidationError("Invalid Document");
    }

    return new Document(cleaned);
  }

  get value() {
    return this._value;
  }

  isCpf() {
    return this.value.length === 11;
  }

  isCnpj() {
    return this.value.length === 14;
  }

  getFormatted() {
    return this.isCpf()
      ? this.formatCpf(this._value)
      : this.formatCnpj(this._value);
  }

  private formatCpf(cpf: string) {
    return cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
  }

  private formatCnpj(cnpj: string) {
    return cnpj.replace(
      /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
      "$1.$2.$3/$4-$5",
    );
  }

  equals(other: Document) {
    return this._value === other._value;
  }
}
