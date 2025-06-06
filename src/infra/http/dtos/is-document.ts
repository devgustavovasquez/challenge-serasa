import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from "class-validator";
import { DocumentValidator } from "src/domain/validators/document-validator";

@ValidatorConstraint({ async: false })
class IsDocumentConstraint implements ValidatorConstraintInterface {
  validate(document: unknown) {
    if (typeof document !== "string") return false;
    return DocumentValidator.isValid(document);
  }

  defaultMessage() {
    return "Document must be a valid CPF or CNPJ.";
  }
}

export function IsDocument(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsDocumentConstraint,
    });
  };
}
