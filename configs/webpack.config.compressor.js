const path = require("path");
const HardSourceWebpackPlugin = require("hard-source-webpack-plugin");
const webpack = require("webpack");

function home(...p) {
  return path.resolve(__dirname, "..", ...p);
}

module.exports = {
  target: "node",
  mode: "production",
  entry: {
    // app: home("app", "build", "web", "index.html"),
    server: home("server", "build", "server.js"),
    cli: home("cli", "build", "cli.js"),
    "cli-server": home("cli", "build", "server.js")
  },
  output: {
    path: home("out"),
    filename: "[name].js"
  },
  plugins: [
    new HardSourceWebpackPlugin(),
    new webpack.BannerPlugin({
      banner: "require('source-map-support').install();"
    })
  ],
  externals: ["uws"],
  optimization: {
    splitChunks: false
  }
};
