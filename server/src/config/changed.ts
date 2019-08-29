import ConfigEmitter from "./ConfigEmitter";
export default (configEmitter: ConfigEmitter, key: string, value: any) => {
  switch (key) {
    case "port":
      if (configEmitter.config.port !== value) {
        configEmitter.emit("changedPort", value);
        configEmitter.config.port = value;
      }
  }
};
