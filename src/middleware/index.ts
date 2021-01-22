import messageLogger from "./messageLogger";
import NSFWClassify from "./NSFWClassify";
import NSFWUpdateHandler from "./NSFWUpdateHandler";

const middleware = {
  messageLogger,
  NSFWClassify,
  NSFWUpdateHandler,
};

export default middleware;
