import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import "reflect-metadata";
import { AppModule } from "./app.module";
import { setupSwagger } from "./infra/http/docs/swagger.config";
import { GlobalErrorFilter } from "./infra/http/filters/global-error-filter";
import { LoggingInterceptor } from "./infra/http/interceptors/logging-interceptor";
import { WinstonLoggerService } from "./infra/logger/winston-logger.service";

async function bootstrap() {
  const logger = new WinstonLoggerService();

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      logger,
    },
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalFilters(new GlobalErrorFilter());

  setupSwagger(app);

  await app.listen(process.env.PORT ?? 3000);

  logger.log(`Application is running on port ${process.env.PORT ?? 3000}`);
}

bootstrap().catch((error) => {
  console.error("Failed to start the application:", error);
  process.exit(1);
});
