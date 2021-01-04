import "./utils/secrets";
import { logger } from "./utils/logger";
import { Telegraf } from "telegraf";

const bot = new Telegraf(process.env.BOT_TOKEN);

if (process.env.NODE_ENV !== "production") {
  bot.use((ctx, next) => {
    logger.debug(ctx.message);
    next();
  });
}

bot.launch().then(() => logger.debug("bot launched successfully"));
