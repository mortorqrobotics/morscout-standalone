import { createClient, ClientOpts, RedisClient } from "redis";
import { promisify } from "util";
import ConfigEmitter from "./ConfigEmitter";

export interface RedisArgs {
  host: string;
  port: string;
}

export default (configEmitter: ConfigEmitter, redisArgs: RedisArgs) => {
  configEmitter.clients.redis = generateAsync(
    createClient(configEmitter.config.redis as ClientOpts)
  );
  configEmitter.on("changeRedis", (config: ClientOpts) => {
    configEmitter.clients.redis = generateAsync(createClient(config));
  });
};

function generateAsync(redis: RedisClient) {
  Object.keys(redis).forEach(key => {
    // eslint-disable-next-line security/detect-object-injection
    if (typeof redis[key]) redis[key] = promisify(redis[key]);
  });
  return redis;
}
