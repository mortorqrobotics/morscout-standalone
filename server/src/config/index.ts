import { parse } from "yaml";
import { readFileSync } from "fs";
import args from "./args";
import ConfigEmitter, { IConfiguration } from "./ConfigEmitter";
import redisClient from "./redis";
import consulClient from "./consul";
import mongooseClient from "./mongo";
import defaultConfig from "./defaultConfig";
import logger from "./logger";

function loadConfig(path): IConfiguration {
  const data: Buffer = readFileSync(path);
  return parse(data.toString());
}

const config = loadConfig(args.config);

const configEmitter = new ConfigEmitter();
configEmitter.config = Object.assign(
  {},
  defaultConfig,
  config,
  config[args.env as string] || {},
  args
);

logger(configEmitter);

let consulArgs: URL;
try {
  consulArgs = new URL(args.consulHost as string);
} catch {}
if ((config.consul && config.consul.use) || consulArgs) {
  consulClient(configEmitter, consulArgs);
}

let mongoArgs: URL;
try {
  mongoArgs = new URL(args.redisHost as string);
} catch {}
if (!(config.mongo || mongoArgs)) {
  throw new Error("MORSCOUT NEEDS MONGODB!");
}
mongooseClient(configEmitter, mongoArgs);

let redisArgs: URL;
try {
  redisArgs = new URL(args.redisHost as string);
} catch {}
if ((config.redis && config.redis.use) || redisArgs) {
  redisClient(configEmitter, redisArgs);
}

export default configEmitter;
