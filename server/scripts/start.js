// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = "development";
process.env.NODE_ENV = "development";

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on("unhandledRejection", err => {
  throw err;
});

// Ensure environment variables are read.
require("../config/env");

const webpack = require("webpack");
const checkRequiredFiles = require("react-dev-utils/checkRequiredFiles");
const { createCompiler } = require("react-dev-utils/WebpackDevServerUtils");
const paths = require("../config/paths");
const config = require("../config/webpack.config.dev");

// Warn and crash if required files are missing
if (!checkRequiredFiles([paths.appIndexJs])) {
  process.exit(1);
}

// eslint-disable-next-line
const appName = require(paths.appPackageJson).name;

// Create a webpack compiler that is configured with custom messages.
const compiler = createCompiler(webpack, config, appName, [], paths.useYarn);

const watcher = compiler.watch(
  {
    ignored: /node_modules/
  },
  err => {
    // eslint-disable-next-line
  if (err) console.error(err);
  }
);

["SIGINT", "SIGTERM"].forEach(sig => {
  process.on(sig, () => {
    watcher.close();
    process.exit();
  });
});
