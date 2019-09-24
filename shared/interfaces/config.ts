interface IConfigInt {
  extends?: string;
  socketIO: string;
  http: string;
}

export default interface IConfig extends IConfigInt {
  default?: IConfigInt;
}
