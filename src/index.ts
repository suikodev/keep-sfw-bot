import "reflect-metadata";
import {
  ENVIRONMENT,
  BOT_WEBHOOK_DOMAIN,
  BOT_WEBHOOK_PORT,
  BOT_TOKEN,
} from "./utils/secrets";
import { logger } from "./utils/logger";
import { Telegraf } from "telegraf";

import middleware from "./middleware";
import SFWContext from "./context";

const bot = new Telegraf<SFWContext>(BOT_TOKEN);

if (ENVIRONMENT !== "production") {
  bot.use(middleware.messageLogger);
}

bot.use(middleware.NSFWClassify);
bot.use(middleware.NSFWUpdateHandler);

if (ENVIRONMENT === "production" && BOT_WEBHOOK_DOMAIN) {
  bot
    .launch({
      webhook: {
        domain: BOT_WEBHOOK_DOMAIN,
        port: parseInt(BOT_WEBHOOK_PORT, 10) || 3000,
      },
    })
    .then(() =>
      logger.debug(`use webhook mode, listen at ${BOT_WEBHOOK_PORT || 3000}`)
    );
} else {
  bot.launch().then(() => logger.debug("use polling mode"));
}

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
