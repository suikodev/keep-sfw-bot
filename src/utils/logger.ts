import winston, { format } from "winston";

export const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: process.env.NODE_ENV === "production" ? "error" : "debug",
      format: format.combine(format.timestamp(), format.prettyPrint()),
    }),
    new winston.transports.File({
      filename: "debug.log",
      level: "debug",
      format: format.combine(format.timestamp(), format.json()),
    }),
  ],
});
