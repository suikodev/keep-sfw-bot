import { logger } from "../utils/logger";
import { Context, Middleware } from "telegraf";

export const messageLogger: Middleware<Context> = (ctx, next) => {
  logger.debug(ctx.message);
  next();
};
