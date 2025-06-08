import { ArgumentsHost, Catch, ExceptionFilter, Logger } from "@nestjs/common";
import { FastifyReply } from "fastify";
import { AppError } from "src/core/errors/app-error";

@Catch()
export class GlobalErrorFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalErrorFilter.name);
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();

    if (exception instanceof AppError) {
      response.status(exception.statusCode).send(exception.toJSON());
    } else {
      this.logger.error(exception);
      response.status(500).send({
        statusCode: 500,
        error: "InternalServerError",
        message: "An unexpected error occurred.",
      });
    }
  }
}
