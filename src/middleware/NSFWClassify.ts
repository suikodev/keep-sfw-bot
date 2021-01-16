import SFWContext from "../context";
import { Middleware } from "telegraf";
import { load as loadNSFWModel, NSFWJS } from "nsfwjs";
import { node as tfNode, Tensor3D } from "@tensorflow/tfjs-node";
import fetch from "node-fetch";
import sharp from "sharp";

let model: NSFWJS;
(async () => {
  model = await loadNSFWModel("file://model/", { size: 299 });
})();

const NSFWClassify: Middleware<SFWContext> = async (ctx, next) => {
  const resp = await fetch(ctx.fileLink);
  let imageBuffer = await resp.buffer();
  imageBuffer = await sharp(imageBuffer).jpeg().toBuffer();
  const image = tfNode.decodeImage(imageBuffer, 3) as Tensor3D;
  const predictions = await model.classify(image);
  ctx.predictions = predictions;
  next();
  image.dispose();
};

export default NSFWClassify;
