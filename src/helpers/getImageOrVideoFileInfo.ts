import { Context } from "telegraf";

export type FileInfo = {
  fileUniqueId: string;
  fileId: string;
  fileType: "image" | "video";
};

function getFileInfoWithFileType<
  T extends { file_id: string; file_unique_id: string }
>(file: T, fileType: FileInfo["fileType"]): FileInfo {
  return { fileId: file.file_id, fileUniqueId: file.file_unique_id, fileType };
}

export const getImageOrVideoFileInfo = (ctx: Context): FileInfo | undefined => {
  let fileInfo: FileInfo | undefined;
  if ("photo" in ctx.message) {
    const file = ctx.message.photo[0];
    fileInfo = getFileInfoWithFileType(file, "image");
  }

  if ("video" in ctx.message) {
    const file = ctx.message.video;
    fileInfo = getFileInfoWithFileType(file, "video");
  }
  if ("sticker" in ctx.message) {
    const file = ctx.message.sticker;
    fileInfo = getFileInfoWithFileType(file, "image");
  }
  if ("document" in ctx.message) {
    const file = ctx.message.document;
    const mimeType = file.mime_type || "";
    if (mimeType.startsWith("video")) {
      fileInfo = getFileInfoWithFileType(file, "video");
    }
    if (mimeType.startsWith("image")) {
      fileInfo = getFileInfoWithFileType(file, "image");
    }
  }
  return fileInfo;
};
