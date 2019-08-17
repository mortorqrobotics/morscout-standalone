import { createClient, ClientOpts } from "redis";
import ConfigEmitter from "./ConfigEmitter";

export interface RedisArgs {
  host: string;
  port: string;
}

export default (configEmitter: ConfigEmitter, redisArgs: RedisArgs) => {
  console.log(configEmitter);
  configEmitter.clients.redis = createClient(configEmitter.config
    .redis as ClientOpts);
  configEmitter.on("changeRedis", (config: ClientOpts) => {
    configEmitter.clients.redis = createClient(config);
  });
};
