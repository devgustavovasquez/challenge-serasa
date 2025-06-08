import { AppError } from "./app-error";

export class ValidationError extends AppError {
  statusCode = 404;
  name = "ValidationError";

  constructor(message: string = "Something wrong in your request") {
    super(message);
  }
}
