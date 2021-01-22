import { Context } from "telegraf";
export async function isGroupAdmin(ctx: Context): Promise<boolean>;
export async function isGroupAdmin(
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
