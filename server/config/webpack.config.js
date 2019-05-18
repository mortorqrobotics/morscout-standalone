const path = require("path");
const webpack = require("webpack");
const HardSourceWebpackPlugin = require("hard-source-webpack-plugin");
const NodeExternals = require("webpack-node-externals");
const eslintFormatter = require("react-dev-utils/eslintFormatter");
const ModuleScopePlugin = require("react-dev-utils/ModuleScopePlugin");
const packageJson = require("../../package.json");
const paths = require("./paths");
require("./env");

const getSrc = (...folder) => path.resolve(__dirname, "..", "src", ...folder);

// This is the production configuration.
// It compiles slowly and is focused on producing a fast and minimal bundle.
// The development configuration is different and lives in a separate file.
module.exports = {
  target: "async-node",
  // We generate sourcemaps in production. This is slow but gives good results.
  // You can exclude the *.map files from the build during deployment.
  devtool: "source-map",
  // In production, we only want to load the polyfills and the app code.
  entry: {
    server: paths.appIndexJs
  },
  output: {
    // The build folder.
    path: paths.appBuild,
    // Generated JS file names (with nested folders).
    // There will be one main bundle, and one file per asynchronous chunk.
    // We don't currently advertise code splitting but Webpack supports it.
    filename: "[name].js",
    chunkFilename: "chunks/[name].[chunkhash:8].chunk.js",
    // // We inferred the "public path" (such as / or /my-project) from homepage.
    publicPath: paths.serverBuild,
    library: "morscout",
    libraryExport: "default",
    libraryTarget: "commonjs2"
  },
  resolve: {
    // This allows you to set a fallback for where Webpack should look for modules.
    // We placed these paths second because we want `node_modules` to "win"
    // if there are any conflicts. This matches Node resolution mechanism.
    // https://github.com/facebook/create-react-app/issues/253
    modules: ["node_modules"].concat(
      // It is guaranteed to exist because we tweak it in `env.js`
      process.env.NODE_PATH.split(path.delimiter).filter(Boolean)
    ),
    // These are the reasonable defaults supported by the Node ecosystem.
    // We also include JSX as a common component filename extension to support
    // some tools, although we do not recommend using it, see:
    // https://github.com/facebook/create-react-app/issues/290
    // `web` extension prefixes have been added for better support
    // for React Native Web.
    extensions: paths.moduleFileExtensions.map(function(ext) {
      return "." + ext;
    }),
    alias: {
      // MorScout Folder Linking
      shared: getSrc("shared"),
      models: getSrc("models")
    },
    plugins: [
      // Prevents users from importing files from outside of src/ (or node_modules/).
      // This often causes confusion because we only process files within src/ with babel.
      // To fix this, we prevent you from importing files out of src/ -- if you'd like to,
      // please link the files into your node_moAdules/ and let module-resolution kick in.
      // Make sure your source files are compiled, as they will not be processed in any way.
      new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson])
    ]
  },
  module: {
    strictExportPresence: true,
    rules: [
      // Disable require.ensure as it's not a standard language feature.
      { parser: { requireEnsure: false } },

      // First, run the linter.
      // It's important to do this before Babel processes the JS.
      {
        test: /\.(js|jsx|mjs|ts|tsx)$/,
        enforce: "pre",
        use: [
          {
            options: {
              formatter: eslintFormatter,
              eslintPath: require.resolve("eslint")
            },
            loader: require.resolve("eslint-loader")
          }
        ],
        include: paths.srcPaths,
        exclude: [/[/\\\\]node_modules[/\\\\]/]
      },
      {
        // "oneOf" will traverse all following loaders until one will
        // match the requirements. When no loader matches it will fall
        // back to the "file" loader at the end of the loader list.
        oneOf: [
          // Process application JS with Babel.
          // The preset includes JSX, Flow, and some ESnext features.
          {
            test: /\.(js|jsx|mjs)$/,
            include: paths.srcPaths,
            exclude: [/[/\\\\]node_modules[/\\\\]/],
            use: [
              // This loader parallelizes code compilation, it is optional but
              // improves compile time on larger projects
              require.resolve("thread-loader"),
              {
                loader: require.resolve("babel-loader"),
                options: {
                  compact: true,
                  highlightCode: true
                }
              }
            ]
          },
          {
            test: /\.(ts|tsx)$/,
            include: paths.srcPaths,
            exclude: [/[/\\\\]node_modules[/\\\\]/],
            loader: require.resolve("ts-loader")
          },
          // Process any JS outside of the app with Babel.
          // Unlike the application JS, we only compile the standard ES features.
          {
            test: /\.js$/,
            use: [
              // This loader parallelizes code compilation, it is optional but
              // improves compile time on larger projects
              require.resolve("thread-loader"),
              {
                loader: require.resolve("babel-loader"),
                options: {
                  cacheDirectory: true,
                  highlightCode: true
                }
              }
            ]
          }
          // ** STOP ** Are you adding a new loader?
          // Make sure to add the new loader(s) before the "file" loader.
        ]
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin({
      raw: true,
      banner: "require('source-map-support').install();"
    }),
    new HardSourceWebpackPlugin(),
    new webpack.EnvironmentPlugin({
      __version: packageJson.version
    })
  ],
  externals: [NodeExternals()],
  node: {
    Buffer: false,
    __dirname: true,
    __filename: false
  }
};
