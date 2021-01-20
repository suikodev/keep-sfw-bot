import messageLogger from "./messageLogger";
import storeFileIdForClassification from "./storeFileIdForClassification";
import NSFWClassify from "./NSFWClassify";
import NSFWUpdateHandler from "./NSFWUpdateHandler";

const middleware = {
  messageLogger,
  storeFileIdForClassification,
  NSFWClassify,
  NSFWUpdateHandler,
};

export default middleware;
