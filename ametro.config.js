process.env.NODE_ENV = "development";
const {
  NodeJsInputFileSystem,
  CachedInputFileSystem,
  ResolverFactory
} = require('enhanced-resolve');
const crypto = require('crypto');
const fs = require('fs')
const config = require('./app/config/resolve.js');
// Typical usage will consume the `NodeJsInputFileSystem` + `CachedInputFileSystem`, which wraps the Node.js `fs` wrapper to add resilience + caching.
config.fileSystem = new CachedInputFileSystem(new NodeJsInputFileSystem(), 4000);
// create a resolver
const resolver = ResolverFactory.createResolver(config);



module.exports = {
  transformer:{
  },
  resolver:{
    // resolveRequest: function(context,
    //   moduleName,
    //   platform,){
    //     const p = resolver.resolveSync(context, originModulePath, moduleName);
    //     console.log(platform)
    //     return {
    //       type: 'sourceFile',
    //       filePath: p
    //     };
    // },
  },
  server: {
    enableVisualizer: true
  },
  reporter: {update: console.log},
  cacheVersion: crypto.randomBytes(1024),
}
