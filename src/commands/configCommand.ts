import { BOT_ADMIN } from "../utils/secrets";
import { Context, Middleware } from "telegraf";
import { configMenu as configMenuMiddleware } from "../middleware";

export const config: Middleware<Context> = (ctx) => {
  if (ctx.from.id.toString() === BOT_ADMIN) {
    configMenuMiddleware.replyToContext(ctx);
  }
};
