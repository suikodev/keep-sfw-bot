import { logger } from "../utils/logger";
import { Context, Middleware } from "telegraf";

const messageLogger: Middleware<Context> = (ctx, next) => {
  logger.debug(ctx.message);
  next();
};

export default messageLogger;
