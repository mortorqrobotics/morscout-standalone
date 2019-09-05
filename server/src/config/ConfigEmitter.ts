import TbaApiV3client from "tba-api-v3client";
import EventEmitter from "events";
import { ClientOpts, RedisClient } from "redis";
import Consul from "consul";
import mongoose from "mongoose";
import winston from "winston";

interface CommonOpts {
  use: boolean;
  consulService: string;
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
  interactive: boolean;
  development: boolean;
  port: number;
  redirectPort: number;
  hostname: string;
  redis: RedisOpts;
  consul: ConsulOpts;
  mongo: MongooseOpts;
  cert: string;
  key: string;
  env: {
    [propName: string]: Configuration;
  };
  install: {
    full: boolean;
    override: boolean;
  };
  tbaApiKey: string;
  frc?: {
    username: string;
    token: string;
  };
}

export default class ConfigEmitter extends EventEmitter {
  config: Configuration;
  logger: winston.Logger;
  clients: {
    consul?: Consul.Consul;
    redis?: RedisClient;
    mongoose: mongoose.Mongoose;
    tba: {
      DistrictApi: any;
      EventApi: any;
      ListApi: any;
      TeamApi: any;
      TBAApi: {
        getStatus: () => object;
      };
      ApiClient: any;
    };
  };
  constructor() {
    super();
    this.clients = {
      mongoose,
      tba: TbaApiV3client
    };
  }
}
