import messageLogger from "./messageLogger";
import storeFileId from "./storeFileId";

const middleware = {
  messageLogger,
  storeFileLink: storeFileId,
};

export default middleware;
