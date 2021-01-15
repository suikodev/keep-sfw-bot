import { Middleware } from "telegraf";
import SFWContext from "../context";

const storeFileLink: Middleware<SFWContext> = async (ctx, next) => {
  let fileId;
  if ("photo" in ctx.message) fileId = ctx.message.photo[0].file_id;
  if ("video" in ctx.message) fileId = ctx.message.video.file_id;
  if ("sticker" in ctx.message) fileId = ctx.message.sticker.file_id;
  if ("document" in ctx.message) fileId = ctx.message.document.file_id;
  if (fileId) ctx.fileLink = await ctx.telegram.getFileLink(fileId);
  next();
};

export default storeFileLink;
