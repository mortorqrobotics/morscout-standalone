const merge = require("webpack-merge");
const common = require("./webpack.config");
// This is the development configuration.
// It compiles quickly and is focused on producing a complete and mapped bundle.
// The production configuration is different and lives in a separate file.
module.exports = merge(common, {
  mode: "development",
  // Don't attempt to continue if there are any errors.
  bail: true,
  optimization: {
    // Automatically split vendor and commons
    // https://twitter.com/wSokra/status/969633336732905474
    // https://medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366
    splitChunks: {
      chunks: "all",
      name: "vendors"
    }
    // Keep the runtime chunk seperated to enable long term caching
    // https://twitter.com/wSokra/status/969679223278505985
    // runtimeChunk: true,
  }
});
