import { Context } from "telegraf";
import { MenuTemplate, MenuMiddleware } from "telegraf-inline-menu";

const menu = new MenuTemplate<Context>(
  (ctx) =>
    `Hey ${ctx.from.first_name}, you can configure group which the bot should take effect and filter settings in this menu`
);

menu.navigate("group setting", "/group-setting/");

menu.navigate("filter setting", "/filter-setting/");

export const configMenu = new MenuMiddleware("/", menu);
