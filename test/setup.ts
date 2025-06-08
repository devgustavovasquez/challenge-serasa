import { Logger } from "@nestjs/common";

if (process.env.NODE_ENV === "test") {
  Logger.overrideLogger([]);
}
