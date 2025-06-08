import { Injectable, LoggerService } from "@nestjs/common";
import { createLogger, format, transports } from "winston";
import "winston-daily-rotate-file";

@Injectable()
export class WinstonLoggerService implements LoggerService {
  private logger;

  constructor() {
    const level = process.env.LOG_LEVEL || "info";

    const dailyRotateTransport = new transports.DailyRotateFile({
      dirname: "logs",
      filename: "%DATE%.log",
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "14d",
      level,
    });

    this.logger = createLogger({
      level,
      format: format.combine(
        format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        format.printf(
          (info) =>
            `${info.timestamp} [${info.level.toUpperCase()}] ${info.message}`,
        ),
      ),
      transports: [new transports.Console({ level }), dailyRotateTransport],
      exceptionHandlers: [
        new transports.File({ filename: "logs/exceptions.log" }),
      ],
    });
  }

  log(message: string) {
    this.logger.info(message);
  }

  error(message: string, trace?: string) {
    this.logger.error(`${message} - Trace: ${trace || "N/A"}`);
  }

  warn(message: string) {
    this.logger.warn(message);
  }

  debug?(message: string) {
    this.logger.debug(message);
  }
}
