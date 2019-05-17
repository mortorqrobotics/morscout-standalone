import { parse } from "yaml";
import { join } from "path";
import { readFile } from "fs";
import { path as appRootPath } from "app-root-path";

export const loadConfig = path => {
  return new Promise((resolve, reject) =>
    readFile(path, (err, data) => {
      if (err) {
        reject(err);
      }
      try {
        resolve(parse(data.toString()));
      } catch (err) {
        reject(err);
      }
    })
  );
};

export default () => {
  return loadConfig(join(appRootPath, "config.yml"));
};
