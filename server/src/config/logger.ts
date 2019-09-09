import winston from "winston";
import ConfigEmitter from "./ConfigEmitter";

export default (configEmitter: ConfigEmitter) => {
  configEmitter.logger = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    defaultMeta: { service: "user-service" },
    transports: []
  });
};
