/* eslint-disable security/detect-object-injection */
import { join } from "path";
import { readFileSync } from "fs";
import { parse } from "yaml";
import * as models from "../../../src/models";

export default async function getData() {
  let data = {};
  try {
    data = parse(
      readFileSync(join(__dirname, "data", "mongoose.yml")).toString()
    );
  } catch (e) {
    console.log(e);
  }
  let promises: Promise<any>[] = [];
  Object.entries(models).forEach(([name, model]) => {
    if (typeof data[name] !== "undefined") {
      data[name].forEach(datum => {
        promises.push((new model(datum) as any).save());
        // (m as any).save().catch(() => {});
      });
    }
  });
  await Promise.all(promises);
}
