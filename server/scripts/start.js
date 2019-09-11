/* eslint-disable no-console */
// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = "development";
process.env.NODE_ENV = "development";

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on("unhandledRejection", (err, s) => {
  console.log("Rejection at: ", s);
  throw err;
});

// Ensure environment variables are read.
require("../config/env");

const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const webpack = require("webpack");
const {
  createCompiler,
  prepareUrls
} = require("react-dev-utils/WebpackDevServerUtils");
const fork = require("child_process").fork;

const paths = require("../config/paths");
const config = require("../config/webpack.config.dev");
// eslint-disable-next-line import/no-dynamic-require
const appPackageJson = require(paths.appPackageJson);

const useYarn = fs.existsSync(paths.yarnLockFile);
const isInteractive = process.stdout.isTTY;

// Tools like Cloud9 rely on this.
const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000;
const HOST = process.env.HOST || "0.0.0.0";

if (process.env.HOST) {
  console.log(
    chalk.cyan(
      `Attempting to bind to HOST environment variable: ${chalk.yellow(
        chalk.bold(process.env.HOST)
      )}`
    )
  );
  console.log(
    "If this was unintentional, check that you haven't mistakenly set it in your shell."
  );
  console.log(
    `Learn more here: ${chalk.yellow("http://bit.ly/CRA-advanced-config")}`
  );
  console.log();
}
const protocol = process.env.HTTPS === "true" ? "https" : "http";
const appName = appPackageJson.name;
const urls = prepareUrls(protocol, HOST);
// Create a webpack compiler that is configured with custom messages.
const compiler = createCompiler({
  webpack,
  config,
  appName,
  urls,
  useYarn
});
let server;
const watcher = compiler.watch({}, (error, stats) => {
  console.log(error);
  if (error) {
    console.log(error);
    return;
  } else {
    console.log(
      `Reloading ${path.join(__dirname, "..", "build", "server.js")}`
    );
    if (fs.existsSync(path.join(__dirname, "..", "build", "server.js"))) {
      if (typeof server !== "undefined") server.kill();
      server = fork(path.join(__dirname, "..", "build", "server.js"));
    }
  }
});

["SIGINT", "SIGTERM"].forEach(sig => {
  process.on(sig, () => {
    server.kill(sig);
    watcher.close();
    process.exit();
  });
});
