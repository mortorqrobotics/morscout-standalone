import winston from "winston";
import ConfigEmitter from "./ConfigEmitter";

export default (configEmitter: ConfigEmitter) => {
  configEmitter.logger = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    defaultMeta: { service: "user-service" },
    transports: [
      winston.transports.Console()
    ]
  });
  process.on("uncaughtException", (error: Error) => {
    configEmitter.logger.error(
      `Exiting because of ${error.name} with message:\n${error.message}\nat ${error.stack}`
    );
    process.exit(129);
  });
  const unhandledRejections: Map<Promise<any>, Error> = new Map();
  process.on("unhandledRejection", (reason: Error, promise: Promise<any>) => {
    unhandledRejections.set(promise, reason);
    configEmitter.logger.error(
      `Promise rejected because of ${reason.name} with message:\n${reason.message}\nat ${reason.stack}`
    );
  });
  process.on("rejectionHandled", (promise: Promise<any>) => {
    configEmitter.logger.warn(
      `Rejection in promise ${
        unhandledRejections.get(promise).stack
      } caught afterall (consider chaining the catch method to this promise)`
    );
  });
};
