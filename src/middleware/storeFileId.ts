import { Middleware } from "telegraf";
import SFWContext from "../context";

const storeFileId: Middleware<SFWContext> = async (ctx, next) => {
  let fileId;
  if ("photo" in ctx.message) fileId = ctx.message.photo[0].file_id;
  if ("video" in ctx.message) fileId = ctx.message.video.file_id;
  if ("sticker" in ctx.message) fileId = ctx.message.sticker.file_id;
  if ("document" in ctx.message) {
    const mimeType = ctx.message.document.mime_type || "";
    if (mimeType.startsWith("video") || mimeType.startsWith("image")) {
      fileId = ctx.message.document.file_id;
    }
  }
  if (fileId) ctx.fileId = fileId;
  next();
};

export default storeFileId;
