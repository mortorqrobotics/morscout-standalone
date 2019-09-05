import ConfigEmitter from "./ConfigEmitter";

export interface MongooseArgs {
  host: string;
  port: string;
}

export default async (
  configEmitter: ConfigEmitter,
  mongooseArgs: MongooseArgs
) => {
  const logger = configEmitter.logger;
  const config = configEmitter.config.mongo;
  const { url, consulService } = config;
  config.useNewUrlParser = true;
  config.useCreateIndex = true;
  delete config.url;
  delete config.consulService;
  if (configEmitter.clients.consul && consulService) {
    const nodes: Array<{
      Address: string;
      Port: number;
    }> = await configEmitter.clients.consul.catalog.nodes(consulService);
    configEmitter.clients.mongoose
      .connect(
        nodes.map(node => `mongodb://${node.Address}:${node.Port}`).join(";"),
        config
      )
      .catch(logger.error);
  } else
    configEmitter.clients.mongoose.connect(url, config).catch(logger.error);
};
