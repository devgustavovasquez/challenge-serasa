import { AppError } from "./app-error";

export class NotFoundError extends AppError {
  statusCode = 404;
  name = "NotFoundError";

  constructor(message: string = "Resource not found") {
    super(message);
  }
}
