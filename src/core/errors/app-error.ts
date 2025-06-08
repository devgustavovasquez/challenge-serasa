export abstract class AppError extends Error {
  abstract statusCode: number;
  abstract name: string;

  constructor(message: string) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
  }

  toJSON() {
    return {
      statusCode: this.statusCode,
      error: this.name,
      message: this.message,
    };
  }
}
