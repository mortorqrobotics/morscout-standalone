import { createClient, ClientOpts, RedisClient } from "redis";
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
    configEmitter.clients.redis = createClient(config);
  });
};
