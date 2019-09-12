import { Model } from "mongoose";
import * as models from "models";
import configEmitter from "config";

export default (): void => {
  configEmitter.logger.info("Starting complete db cleaning");
  Object.values(models).forEach((model: Model<any, {}>) => {
    configEmitter.logger.debug(`Clearing: ${model.modelName}`);
    model.deleteMany({});
  });
  configEmitter.logger.info("Finished cleaning db");
};
