import { Context } from "telegraf";
import { predictionType } from "nsfwjs";

interface SFWContext extends Context {
  fileLink: string | URL;
  predictions: predictionType[];
}

export default SFWContext;
