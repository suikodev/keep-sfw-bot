import winston, { format } from "winston";
import { ENVIRONMENT } from "./secrets";

export const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: ENVIRONMENT === "production" ? "error" : "debug",
      format: format.combine(format.timestamp(), format.prettyPrint()),
    }),
    new winston.transports.File({
      filename: "./logs/debug.log",
      level: "./logs/debug",
      format: format.combine(format.timestamp(), format.json()),
    }),
  ],
});
