import { Context } from "telegraf";
import { predictionType } from "nsfwjs";

interface SFWContext extends Context {
  predictions: predictionType[];
}

export default SFWContext;
