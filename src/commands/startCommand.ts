import { Context, Middleware } from "telegraf";

const startCommand: Middleware<Context> = async (ctx) => {
  if (ctx.chat.type !== "private") return;
  await ctx.replyWithMarkdownV2(`👋 hello\\! nice to meet you ✨  

you can use me to filter NSFW image\\(may have ability to filter video in next version:P\\) in group\\.  

click /config or send 'config' command to configure bot for your group`);
};

export default startCommand;
