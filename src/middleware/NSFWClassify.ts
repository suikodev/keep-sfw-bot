import SFWContext from "../context";
import { Middleware } from "telegraf";
import { load as loadNSFWModel, NSFWJS } from "nsfwjs";
import * as tf from "@tensorflow/tfjs-node";
import fetch from "node-fetch";
import sharp from "sharp";
import { getImageOrVideoFileInfo } from "../helpers";
import { PredictionsClassName, PredictionsMap } from "../types";
import { ClassifiedFile } from "../entities/ClassifiedFile";

let model: NSFWJS;
(async () => {
  tf.enableProdMode();
  model = await loadNSFWModel("file://model/", { size: 299 });
})();

const NSFWClassify: Middleware<SFWContext> = async (ctx, next) => {
  const fileInfo = getImageOrVideoFileInfo(ctx);
  if (!fileInfo) return next();
  const file = await ClassifiedFile.findOne({
    fileUniqueId: fileInfo.fileUniqueId,
  });

  if (file) {
    const predictionsMap: PredictionsMap = new Map();
    predictionsMap.set("Drawing", file.drawing);
    predictionsMap.set("Hentai", file.hentai);
    predictionsMap.set("Neutral", file.neutral);
    predictionsMap.set("Porn", file.porn);
    predictionsMap.set("Sexy", file.sexy);
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

    const file = new ClassifiedFile();
    file.fileUniqueId = fileInfo.fileUniqueId;
    file.hentai = predictionsMap.get("Hentai");
    file.drawing = predictionsMap.get("Drawing");
    file.sexy = predictionsMap.get("Sexy");
    file.porn = predictionsMap.get("Porn");
    file.neutral = predictionsMap.get("Neutral");
    await file.save();
    return next();
  }

  // TODO: deal with video file
  // if (fileInfo?.fileType === "video")
};

export default NSFWClassify;
