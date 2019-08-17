const merge = require("webpack-merge");
const ClosurePlugin = require("closure-webpack-plugin");
const safePostCssParser = require("postcss-safe-parser");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const paths = require("./paths");
const common = require("./webpack.config");

// This is the development configuration.
// It is focused on developer experience and fast rebuilds.
// The production configuration is different and lives in a separate file.
module.exports = merge(common, {
  mode: "production",
  // You may want 'eval' instead if you prefer to see the compiled output in DevTools.
  // See the discussion in https://github.com/facebook/create-react-app/issues/343
  devtool: "source-map",
  // These are the "entry points" to our application.
  // This means they will be the "root" imports that are included in JS bundle.
  entry: [paths.appIndexJs],
  optimization: {
    minimizer: [
      new ClosurePlugin(
        {
          childCompilations: true
        },
        {
          compilation_level: "ADVANCED",
          // disable all warnings (we get them from eslint anyway)
          warningLevel: "QUIET"
        }
      ),
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          parser: safePostCssParser,
          map: false
            ? {
                // `inline: false` forces the sourcemap to be output into a
                // separate file
                inline: false,
                // `annotation: true` appends the sourceMappingURL to the end of
                // the css file, helping the browser find the sourcemap
                annotation: true
              }
            : false
        }
      })
    ],
    // Automatically split vendor and commons
    // https://twitter.com/wSokra/status/969633336732905474
    // https://medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366
    splitChunks: {
      chunks: "all",
      name: false
    },
    concatenateModules: false,
    // Keep the runtime chunk seperated to enable long term caching
    // https://twitter.com/wSokra/status/969679223278505985
    runtimeChunk: true
  }
});
