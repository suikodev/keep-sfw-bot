import "./utils/secrets";
import { logger } from "./utils/logger";
import { Telegraf } from "telegraf";

import middleware from "./middleware";
import SFWContext from "./context";

const bot = new Telegraf<SFWContext>(process.env.BOT_TOKEN);

if (process.env.NODE_ENV !== "production") {
  bot.use(middleware.messageLogger);
}

bot.launch().then(() => logger.debug("bot launched successfully"));
