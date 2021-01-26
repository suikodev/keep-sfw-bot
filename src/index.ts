import "reflect-metadata";
import "./utils/secrets";
import { logger } from "./utils/logger";
import { Telegraf } from "telegraf";

import middleware from "./middleware";
import SFWContext from "./context";
import { createConnection } from "typeorm";

createConnection();

const bot = new Telegraf<SFWContext>(process.env.BOT_TOKEN);

if (process.env.NODE_ENV !== "production") {
  bot.use(middleware.messageLogger);
}

bot.use(middleware.NSFWClassify);
bot.use(middleware.NSFWUpdateHandler);

if (process.env.NODE_ENV === "production" && process.env.BOT_WEBHOOK_DOMAIN) {
  bot
    .launch({
      webhook: {
        domain: process.env.BOT_WEBHOOK_DOMAIN,
        port: parseInt(process.env.BOT_WEBHOOK_PORT, 10) || 3000,
      },
    })
    .then(() =>
      logger.debug(
        `use webhook mode, listen at ${process.env.BOT_WEBHOOK_PORT || 3000}`
      )
    );
} else {
  bot.launch().then(() => logger.debug("use polling mode"));
}

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
