import { Context } from "telegraf";
import { PredictionsMap } from "./types";

interface SFWContext extends Context {
  predictionsMap: PredictionsMap;
}

export default SFWContext;
