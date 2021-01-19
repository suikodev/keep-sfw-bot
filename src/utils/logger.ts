import winston, { format } from "winston";

export const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: process.env.NODE_ENV === "production" ? "error" : "debug",
      format: format.combine(format.timestamp(), format.prettyPrint()),
    }),
    new winston.transports.File({
      filename: "./logs/debug.log",
      level: "./logs/debug",
      format: format.combine(format.timestamp(), format.json()),
    }),
  ],
});
