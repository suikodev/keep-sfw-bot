import SFWContext from "../context";
import { Middleware } from "telegraf";
import { load as loadNSFWModel, NSFWJS } from "nsfwjs";
import { node as tfNode, Tensor3D } from "@tensorflow/tfjs-node";
import fetch from "node-fetch";

let model: NSFWJS;
(async () => {
  model = await loadNSFWModel("file://model/", { size: 299 });
})();

const NSFWClassify: Middleware<SFWContext> = async (ctx) => {
  const resp = await fetch(ctx.fileLink);
  const imageBuffer = await resp.buffer();
  const image = tfNode.decodeImage(imageBuffer, 3) as Tensor3D;
  const predictions = await model.classify(image);
  ctx.predictions = predictions;
  image.dispose();
};

export default NSFWClassify;
