process.env.NODE_ENV = "development";
const {
  NodeJsInputFileSystem,
  CachedInputFileSystem,
  ResolverFactory
} = require("enhanced-resolve");
const path = require("path");
const configFactory = require("./config/resolve.js");

// create a resolver
function resolver(context) {
  const config = configFactory(context);
  // Typical usage will consume the `NodeJsInputFileSystem` + `CachedInputFileSystem`,
  // which wraps the Node.js `fs` wrapper to add resilience + caching.
  config.fileSystem = new CachedInputFileSystem(
    new NodeJsInputFileSystem(),
    4000
  );
  config.useSyncFileSystemCalls = true;
  return ResolverFactory.createResolver(config);
}
const resolvers = {};

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false
      }
    })
  },
  resolver: {
    resolveRequest(context, moduleName, platform) {
      if (Object.keys(resolvers).indexOf(platform) === -1) {
        resolvers[platform] = resolver(context);
      }
      const p = resolvers[platform].resolveSync(
        {},
        path.dirname(context.originModulePath),
        moduleName
      );
      return {
        type: "sourceFile",
        filePath: p
      };
    }
  }
};
