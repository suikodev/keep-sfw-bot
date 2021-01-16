import "./utils/secrets";
import { logger } from "./utils/logger";
import { Telegraf } from "telegraf";

import middleware from "./middleware";
import SFWContext from "./context";
import storeFileId from "./middleware/storeFileId";
import NSFWClassify from "./middleware/NSFWClassify";

const bot = new Telegraf<SFWContext>(process.env.BOT_TOKEN);

if (process.env.NODE_ENV !== "production") {
  bot.use(middleware.messageLogger);
}

bot.use(storeFileId);
bot.use(NSFWClassify);

bot.launch().then(() => logger.debug("bot launched successfully"));
