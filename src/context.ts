import { Context } from "telegraf";
import { predictionType } from "nsfwjs";

interface SFWContext extends Context {
  fileId: string;
  predictions: predictionType[];
}

export default SFWContext;
