import SFWContext from "../context";
import { Middleware } from "telegraf";
import { load as loadNSFWModel, NSFWJS } from "nsfwjs";
import * as tf from "@tensorflow/tfjs-node";
import fetch from "node-fetch";
import sharp from "sharp";
import { getImageOrVideoFileInfo } from "../helpers";
import PrismaClient from "../db/client";
import { PredictionsClassName, PredictionsMap } from "../types";

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
    const predictionsMap: PredictionsMap = new Map();
    predictionsMap.set("Drawing", result.drawing);
    predictionsMap.set("Hentai", result.hentai);
    predictionsMap.set("Neutral", result.neutral);
    predictionsMap.set("Porn", result.porn);
    predictionsMap.set("Sexy", result.sexy);
    ctx.predictionsMap = predictionsMap;
    return next();
  }

  if (fileInfo.fileType === "image") {
    const fileLink = await ctx.telegram.getFileLink(fileInfo.fileId);
    const resp = await fetch(fileLink);
    let imageBuffer = await resp.buffer();
    imageBuffer = await sharp(imageBuffer).jpeg().toBuffer();

    const image = tf.node.decodeImage(imageBuffer, 3) as tf.Tensor3D;
    const predictions = await model.classify(image);

    const predictionsMap: PredictionsMap = new Map();
    for (const prediction of predictions) {
      predictionsMap.set(
        // TODO: remove as after updated nsfwjs version
        prediction.className as PredictionsClassName,
        prediction.probability
      );
    }
    ctx.predictionsMap = predictionsMap;

    image.dispose();

    await prisma.nsfwFile.create({
      data: {
        fileUniqueId: fileInfo.fileUniqueId,
        drawing: predictionsMap.get("Drawing"),
        hentai: predictionsMap.get("Hentai"),
        neutral: predictionsMap.get("Neutral"),
        porn: predictionsMap.get("Porn"),
        sexy: predictionsMap.get("Sexy"),
      },
    });
    return next();
  }

  // TODO: deal with video file
  // if (fileInfo?.fileType === "video")
};

export default NSFWClassify;
