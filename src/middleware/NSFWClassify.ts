import SFWContext from "../context";
import { Middleware } from "telegraf";
import { load as loadNSFWModel, NSFWJS } from "nsfwjs";
import * as tf from "@tensorflow/tfjs-node";
import fetch from "node-fetch";
import sharp from "sharp";

let model: NSFWJS;
(async () => {
  tf.enableProdMode();
  model = await loadNSFWModel("file://model/", { size: 299 });
})();

const NSFWClassify: Middleware<SFWContext> = async (ctx, next) => {
  const resp = await fetch(ctx.fileLink);
  let imageBuffer = await resp.buffer();
  imageBuffer = await sharp(imageBuffer).jpeg().toBuffer();
  const image = tf.node.decodeImage(imageBuffer, 3) as tf.Tensor3D;
  const predictions = await model.classify(image);
  ctx.predictions = predictions;
  next();
  image.dispose();
};

export default NSFWClassify;
