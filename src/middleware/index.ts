import messageLogger from "./messageLogger";
import storeFileId from "./storeFileId";
import NSFWClassify from "./NSFWClassify";
import NSFWUpdateHandler from "./NSFWUpdateHandler";

const middleware = {
  messageLogger,
  storeFileId,
  NSFWClassify,
  NSFWUpdateHandler,
};

export default middleware;
