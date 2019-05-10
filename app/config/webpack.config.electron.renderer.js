const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const paths = require("./paths");
const resolveConf = require("./resolve");
const common = require("./webpack.config");

// This is the development configuration.
// It is focused on developer experience and fast rebuilds.
// The production configuration is different and lives in a separate file.
module.exports = merge({
  customizeArray: merge.unique(
    "plugins",
    ["FaviconsWebpackPlugin"],
    plugin => plugin.constructor && plugin.constructor.name
  )
})(common, {
  entry: [
    // Finally, this is your app's code:
    paths.appIndexJs
  ],
  output: {
    // Add /* filename */ comments to generated require()s in the output.
    pathinfo: true,
    // This does not produce a real file. It's just the virtual path that is
    // served by WebpackDevServer in development. This is the JS bundle
    // containing code from all our entry points, and the Webpack runtime.
    filename: "static/js/bundle.js",
    // There are also additional JS chunk files if you use code splitting.
    chunkFilename: "static/js/[name].chunk.js",
    // Point sourcemap entries to original disk location (format as URL on Windows)
    devtoolModuleFilenameTemplate: info =>
      path.resolve(info.absoluteResourcePath).replace(/\\/g, "/")
  },
  resolve: resolveConf({
    platform: "electron"
  }),
  plugins: [
    // This is necessary to emit hot updates (currently CSS only):
    new webpack.HotModuleReplacementPlugin(),
    new FaviconsWebpackPlugin({
      // Your source logo
      logo: paths.favicon,
      // The prefix for all image files (might be a folder or a name)
      prefix: "icons/",
      // Emit all stats of the generated icons
      emitStats: false,
      // The name of the json containing all favicon information
      statsFilename: "iconstats-[hash].json",
      // Generate a cache file with control hashes and
      // don't rebuild the favicons until those hashes change
      persistentCache: true,
      // Inject the html into the html-webpack-plugin
      inject: true,
      // favicon background color (see https://github.com/haydenbleasel/favicons#usage)
      background: "#fff",
      // favicon app title (see https://github.com/haydenbleasel/favicons#usage)
      // eslint-disable-next-line import/no-dynamic-require, global-require
      title: require(paths.appPackageJson).name,

      // which icons should be generated (see https://github.com/haydenbleasel/favicons#usage)
      icons: {
        android: true,
        appleIcon: true,
        appleStartup: true,
        coast: true,
        favicons: true,
        firefox: true,
        opengraph: true,
        twitter: true,
        yandex: true,
        windows: true
      }
    })
  ]
});
