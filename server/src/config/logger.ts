import winston from "winston";
import ConfigEmitter from "./ConfigEmitter";
import { logStream } from "cli";

export default (configEmitter: ConfigEmitter) => {
  configEmitter.logger = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    defaultMeta: { service: "user-service" },
    transports: [
      //
      // - Write to all logs with level `info` and below to `combined.log`
      // - Write all logs error (and below) to `error.log`.
      //
      new winston.transports.Stream({
        stream: logStream
      })
    ]
  });
};
