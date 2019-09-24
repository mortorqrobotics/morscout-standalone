import TbaApiV3client from "tba-api-v3client";
import EventEmitter from "events";
import { ClientOpts, RedisClient } from "redis";
import Consul from "consul";
import mongoose from "mongoose";
import winston from "winston";

interface ICommonOpts {
  use: boolean;
  consulService: string;
}

interface IConsulOpts
  extends Consul.ConsulOptions,
    Consul.Agent.Check.RegisterOptions,
    ICommonOpts {}
interface IRedisOpts extends ClientOpts, ICommonOpts {}
interface IMongooseOpts extends mongoose.ConnectionOptions, ICommonOpts {
  url: string;
}

export interface IConfiguration {
  interactive: boolean;
  development: boolean;
  port: number;
  redirectPort: number;
  socketPort: number;
  hostname: string;
  redis: IRedisOpts;
  consul: IConsulOpts;
  mongo: IMongooseOpts;
  cert: string;
  key: string;
  env: {
    [propName: string]: IConfiguration;
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
  config: IConfiguration;
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
