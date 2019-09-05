import ConfigEmitter from "./ConfigEmitter";

export default (configEmitter: ConfigEmitter) => {
  configEmitter.clients.tba.ApiClient.instance.authentications["apiKey"].apiKey =
    configEmitter.config.tbaApiKey;
};
