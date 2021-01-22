import SFWContext from "../context";
import { Middleware } from "telegraf";
import { load as loadNSFWModel, NSFWJS, predictionType } from "nsfwjs";
import * as tf from "@tensorflow/tfjs-node";
import fetch from "node-fetch";
import sharp from "sharp";
import { getImageOrVideoFileInfo } from "../helpers";
import PrismaClient from "../db/client";

let model: NSFWJS;
(async () => {
  tf.enableProdMode();
  model = await loadNSFWModel("file://model/", { size: 299 });
})();

const NSFWClassify: Middleware<SFWContext> = async (ctx, next) => {
  const fileInfo = getImageOrVideoFileInfo(ctx);
  if (!fileInfo) return next();

  const prisma = PrismaClient.getInstance().prisma;
  const result = await prisma.nsfwFile.findFirst({
    where: {
      fileUniqueId: fileInfo.fileUniqueId,
    },
  });
  if (result) {
    ctx.predictions = [
      { className: "Porn", probability: result.porn },
      { className: "Sexy", probability: result.sexy },
      { className: "Hentai", probability: result.hentai },
      { className: "Drawing", probability: result.drawing },
      { className: "Neutral", probability: result.neutral },
    ];
    return next();
  }

  if (fileInfo.fileType === "image") {
    const fileLink = await ctx.telegram.getFileLink(fileInfo.fileId);
    const resp = await fetch(fileLink);
    let imageBuffer = await resp.buffer();
    imageBuffer = await sharp(imageBuffer).jpeg().toBuffer();
    const image = tf.node.decodeImage(imageBuffer, 3) as tf.Tensor3D;
    const predictions = await model.classify(image);
    ctx.predictions = predictions;
    image.dispose();
    await prisma.nsfwFile.create({
      data: {
        fileUniqueId: fileInfo.fileUniqueId,
        porn: ctx.predictions.find(
          (prediction) => prediction.className === "Porn"
        ).probability,
        sexy: ctx.predictions.find(
          (prediction) => prediction.className === "Sexy"
        ).probability,
        hentai: ctx.predictions.find(
          (prediction) => prediction.className === "Hentai"
        ).probability,
        drawing: ctx.predictions.find(
          (prediction) => prediction.className === "Drawing"
        ).probability,
        neutral: ctx.predictions.find(
          (prediction) => prediction.className === "Neutral"
        ).probability,
      },
    });
    return next();
  }

  // TODO: deal with video file
  // if (fileInfo?.fileType === "video")
};

export default NSFWClassify;
