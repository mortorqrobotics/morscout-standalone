import Yargs from "yargs/yargs";
import isDocker from "is-docker";
import { path as appRootPath } from "app-root-path";
import { join } from "path";

const yargs = Yargs(process.argv.slice(2));

const development: boolean =
  (process.env.NODE_ENV !== "production" &&
    process.env.MORSCOUT_ENV !== "production") ||
  ((yargs.argv.d as boolean) || (yargs.argv.development as boolean));
const docker: boolean = isDocker();

export default yargs
  .scriptName("morscout-server")
  .env("MORSCOUT")
  .usage("$0 [args]")
  .option("interactive", {
    demandOption: false,
    default: development && !docker,
    type: "boolean"
  })
  .option("install", {
    alias: "i",
    demandOption: false,
    default: false,
    type: "boolean"
  })
  .option("development", {
    alias: "d",
    demandOption: false,
    default: false,
    type: "boolean"
  })
  .option("config", {
    alias: "c",
    demandOption: false,
    default: `${join(appRootPath, "config.yml")}`,
    type: "string"
  })
  .option("port", {
    alias: "p",
    demandOption: false,
    describe: "the port to listen for HTTP requests",
    type: "number"
  })
  .option("socketPort", {
    alias: "sp",
    demandOption: false,
    describe: "the port to listen for Socket.io requests",
    type: "number"
  })
  .option("redirectPort", {
    alias: "rp",
    demandOption: false,
    default: undefined,
    describe: "the port to redirect HTTP from",
    type: "number"
  })
  .option("hostname", {
    alias: "n",
    demandOption: false,
    default: undefined,
    describe: "The Hostname this server is running under (includes morscout.)",
    type: "string"
  })
  .option("cert", {
    demandOption: false,
    default: undefined,
    describe: "the TLS certificate to be used",
    type: "string",
    implies: ["key"]
  })
  .option("key", {
    demandOption: false,
    default: undefined,
    describe: "the TLS key to be used",
    type: "string",
    implies: ["cert"]
  })
  .option("consulHost", {
    demandOption: false,
    default: undefined,
    describe: "the hostname and port for the consul agent",
    type: "string"
  })
  .help()
  .version().argv;
