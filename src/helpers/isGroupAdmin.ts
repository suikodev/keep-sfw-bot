import { Context } from "telegraf";
async function isGroupAdmin(ctx: Context): Promise<boolean>;
async function isGroupAdmin(
  ctx: Context,
  chatId?: string | number
): Promise<boolean> {
  let admins;
  if (chatId === undefined) {
    admins = await ctx.getChatAdministrators();
  } else {
    admins = await ctx.telegram.getChatAdministrators(chatId);
  }
  return admins.some((admin) => admin.user.id === ctx.from.id);
}

export default isGroupAdmin;
