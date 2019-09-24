const path = require("path");
const fs = require("fs");
const PnpWebpackPlugin = require("pnp-webpack-plugin");
// const ModuleScopePlugin = require("react-dev-utils/ModuleScopePlugin");
const paths = require("./paths");

const getSrc = (...p) => path.join(__dirname, "..", "src", ...p);

module.exports = {
  // This allows you to set a fallback for where Webpack should look for modules.
  // We placed these paths second because we want `node_modules` to "win"
  // if there are any conflicts. This matches Node resolution mechanism.
  // https://github.com/facebook/create-react-app/issues/253
  modules: ["node_modules"].concat(
    // It is guaranteed to exist because we tweak it in `env.js`
    (process.env.NODE_PATH || "")
      .split(path.delimiter)
      .filter(folder => folder && !path.isAbsolute(folder))
      .map(folder => path.resolve(fs.realpathSync(process.cwd()), folder))
      .join(path.delimiter)
      .split(path.delimiter)
      .filter(Boolean)
  ),
  mainFields: ["browser", "main"],
  // These are the reasonable defaults supported by the Node ecosystem.
  // We also include JSX as a common component filename extension to support
  // some tools, although we do not recommend using it, see:
  // https://github.com/facebook/create-react-app/issues/290
  // `web` extension prefixes have been added for better support
  // for React Native Web.
  extensions: paths.moduleFileExtensions.map(ext => `.${ext}`),
  alias: {
    "react-native": require.resolve("react-native-web"),
    uranium: getSrc("common", "uranium", "src"),
    // Basic Redirects
    "~": path.dirname(require.resolve("client-common-components")),
    // Global Redirects
    screen: getSrc("screens"),
    style: getSrc("style"),
    // Platform Specific Polyfills
    "@": getSrc("polyfills"),

    // Just for error mitigation
    react: require.resolve("react")
  },
  plugins: [
    // Adds support for installing with Plug'n'Play, leading to faster installs and adding
    // guards against forgotten dependencies and such.
    PnpWebpackPlugin
    // Prevents users from importing files from outside of src/ (or node_modules/).
    // This often causes confusion because we only process files within src/ with babel.
    // To fix this, we prevent you from importing files out of src/ -- if you'd like to,
    // please link the files into your node_modules/ and let module-resolution kick in.
    // Make sure your source files are compiled, as they will not be processed in any way.
    // new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson])
  ]
};
