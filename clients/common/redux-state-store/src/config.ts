import parseUrl from "./parse";
import IConfig from "shared/interfaces/config";

const config = async (
  url: string,
  def: IConfig | object = {}
): Promise<IConfig> => {
  try {
    let conf: IConfig = await (await fetch(parseUrl(url).toString())).json();
    if (conf.extends)
      conf = Object.assign(
        config(conf.extends, conf.default ? conf.default : {}),
        conf
      );
    return conf;
  } catch {
    return def as any;
  }
};

export default config;
