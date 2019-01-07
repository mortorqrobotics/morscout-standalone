const path = require("path");
const fs = require("fs");
const url = require("url");

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebook/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const envPublicUrl = process.env.PUBLIC_URL;

function ensureSlash(p, needsSlash) {
  const hasSlash = p.endsWith("/");
  if (hasSlash && !needsSlash) {
    return p.substr(p, p.length - 1);
  }
  if (!hasSlash && needsSlash) {
    return `${p}/`;
  }
  return p;
}

// eslint-disable-next-line
const getPublicUrl = appPackageJson => envPublicUrl || require(appPackageJson).homepage;

// We use `PUBLIC_URL` environment variable or "homepage" field to infer
// "public path" at which the app is served.
// Webpack needs to know it to put the right <script> hrefs into HTML even in
// single-page apps that may serve index.html for nested URLs like /todos/42.
// We can't use a relative path in HTML because we don't want to load something
// like /todos/42/static/js/bundle.7289d.js. We have to know the root.
function getServedPath(appPackageJson) {
  const publicUrl = getPublicUrl(appPackageJson);
  const servedUrl =
    envPublicUrl || (publicUrl ? url.parse(publicUrl).pathname : "/");
  return ensureSlash(servedUrl, true);
}

// config after eject: we're in ./config/
module.exports = {
  dotenv: resolveApp(".env"),
  appPath: resolveApp("."),
  appIndexJs: resolveApp("server/src/index.js"),
  appPackageJson: resolveApp("package.json"),
  appSrc: resolveApp("server/src"),
  appBuild: resolveApp("server/build"),
  testsSetup: resolveApp("server/src/setupTests.js"),
  appNodeModules: resolveApp("node_modules"),
  publicUrl: getPublicUrl(resolveApp("package.json")),
  servedPath: getServedPath(resolveApp("package.json"))
};

module.exports.srcPaths = [module.exports.appSrc];

module.exports.useYarn = fs.existsSync(
  path.join(module.exports.appPath, "yarn.lock")
);

module.exports.useYarn = module.exports.useYarn;
