import consul, { Agent } from "consul";
import { v4 as uuid } from "uuid";
import ConfigEmitter, { IConfiguration } from "./ConfigEmitter";
import changed from "./changed";

export interface ConsulArgs {
  hostname: string;
  port: string;
}

export default (configEmitter: ConfigEmitter, consulArgs: ConsulArgs) => {
  const { config } = configEmitter;
  const consulClient: consul.Consul = consul({
    host: consulArgs ? consulArgs.hostname : config.consul.host,
    port: consulArgs ? consulArgs.port : config.consul.port,
    secure: true,
    promisify: true
  });
  let consulId: string = uuid();
  consulClient.agent.service.register(
    Object.assign(
      (config.consul as unknown) as consul.Agent.Service.RegisterOptions,
      {
        id: consulId
      }
    )
  );
  setInterval(() => {
    consulClient.agent.check.pass({ id: `service:${consulId}` }, err => {
      if (err) throw err;
      console.log("told Consul that we are healthy");
    });
  }, 5 * 1000);
  process.on("SIGINT", () => {
    console.log("SIGINT. De-Registering...");

    consulClient.agent.service.deregister(consulId, err => {
      console.log("de-registered.", err);
      process.exit();
    });
  });
  configEmitter.on("changePort", (port: number) => {
    consulClient.agent.service.deregister(consulId);
    consulId = uuid();
    consulClient.agent.service.register(
      Object.assign(
        (config.consul as unknown) as consul.Agent.Service.RegisterOptions,
        {
          id: consulId
        }
      )
    );
  });

  // eslint-disable-next-line security/detect-non-literal-fs-filename
  const monitor = consulClient.watch({
    method: consulClient.kv.get,
    options: {
      key: "morscout/"
      // recurse: true
    }
  });
  // monitor.on("changed", kvData => {
  //   const keys = kvData.getKeys();
  //   keys
  //     .filter(name => name.indexOf("morscout/") == 0)
  //     .map(name => name.substr("morscout/".length))
  //     .forEach(key => {
  //       const val = kvData.getValue(key);
  //       changed(configEmitter, key, val);
  //     });
  // });

  Object.assign(configEmitter.config);
};
