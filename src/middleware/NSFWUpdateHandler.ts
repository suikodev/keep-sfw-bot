import SFWContext from "../context";
import { Middleware } from "telegraf";
import { PredictionsClassName } from "../types";

export const NSFWUpdateHandler: Middleware<SFWContext> = (ctx, next) => {
  if (!ctx.predictionsMap) return next();

  // find max probability class
  const predictionsMapIter = ctx.predictionsMap.entries();
  let [className, maxProbability]: [
    PredictionsClassName,
    number
  ] = predictionsMapIter.next().value;
  for (const entry of predictionsMapIter) {
    if (entry[1] > maxProbability) {
      className = entry[0];
      maxProbability = entry[1];
    }
  }
  // handle nsfw update
  if (className === "Porn" || className === "Hentai" || className === "Sexy") {
    const maxProbabilityPercent = (maxProbability * 100)
      .toFixed(2)
      .replace(".", "\\.");
    ctx.replyWithMarkdownV2(
      `*NSFW WARNING*
[${ctx.from.first_name || "undefined"}](tg://user?id=${ctx.from.id})
Max probability: ${className} ${maxProbabilityPercent}%`,
      { reply_to_message_id: ctx.message.message_id }
    );
  }
};
