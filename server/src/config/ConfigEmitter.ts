import EventEmitter from "events";
import { ClientOpts, RedisClient } from "redis";
import Consul from "consul";
import mongoose from "mongoose";

interface CommonOpts {
  use: boolean;
}

interface ConsulOpts
  extends Consul.ConsulOptions,
    Consul.Agent.Check.RegisterOptions,
    CommonOpts {}
interface RedisOpts extends ClientOpts, CommonOpts {}
interface MongooseOpts extends mongoose.ConnectionOptions, CommonOpts {
  url: string;
}

export interface Configuration {
  development: boolean;
  port: number;
  redirectPort: number;
  hostname: string;
  redis: RedisOpts;
  consul: ConsulOpts;
  mongoose: MongooseOpts;
  cert: string;
  key: string;
  env: Configuration | object;
}

export default class ConfigEmitter extends EventEmitter {
  config: Configuration;
  clients: {
    consul?: Consul.Consul;
    redis?: RedisClient;
    mongoose?: mongoose.Mongoose;
  };
  constructor() {
    super();
    this.clients = {};
  }
}
