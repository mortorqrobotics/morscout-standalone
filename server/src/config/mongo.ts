import { connect } from "mongoose";
import ConfigEmitter from "./ConfigEmitter";

export interface MongooseArgs {
  host: string;
  port: string;
}

export default async (
  configEmitter: ConfigEmitter,
  mongooseArgs: MongooseArgs
) => {
  const config = configEmitter.config.mongoose;
  configEmitter.clients.mongoose = await connect(
    config.url,
    config
  );
};
