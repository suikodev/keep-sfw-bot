import SFWContext from "../context";
import { Middleware } from "telegraf";

const NSFWUpdateHandler: Middleware<SFWContext> = (ctx, next) => {
  const maxProbabilityClass = ctx.predictions[0]?.className;
  if (
    maxProbabilityClass === "Porn" ||
    maxProbabilityClass === "Hentai" ||
    maxProbabilityClass === "Sexy"
  ) {
    const maxProbability = (ctx.predictions[0].probability * 100)
      .toFixed(2)
      .replace(".", "\\.");
    ctx.replyWithMarkdownV2(
      `*NSFW WARNING*
[${ctx.from.first_name || "undefined"}](tg://user?id=${ctx.from.id})
Max probability: ${maxProbabilityClass} ${maxProbability}%`,
      { reply_to_message_id: ctx.message.message_id }
    );
  }

  next();
};

export default NSFWUpdateHandler;
