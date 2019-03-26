const path = require("path");
const HardSourceWebpackPlugin = require("hard-source-webpack-plugin");
const webpack = require("webpack");
const htmlLoader = require("html-loader");
const progress = new (require("cli-progress")).Bar({}, require("cli-progress").Presets.shades_classic);
const devPackages = Object.keys(require("../package.json").devDependencies);

const memfs = require("memfs");
const fs = require("fs");
const klaw = require("klaw-sync");
memfs.vol.fromJSON({});

let functions = [];

["app"].forEach(function(name) {
  klaw(path.resolve(__dirname, "..", name, "build"), {
    nodir: true
  })
    .map(function(p) {
      return path.resolve(__dirname, "..", name, "build", p.path);
    })
    .forEach(function(p) {
      functions.push(function() {
        memfs.vol.mkdirpSync(path.dirname(p));
        fs.createReadStream(p).pipe(memfs.vol.createWriteStream(p));
      });
    });
});

klaw(path.resolve(__dirname, "..", "node_modules"), {
  nodir: true,
  filter: function(item){
    const basename = path.basename(item.path);
    // console.log(basename + " "+ (basename === '.' || basename[0] !== '.'));
    return path.extname(item.path) !== ".node";
  }
})
  .map(function(p) {
    // console.log(p.path);
    return path.resolve(__dirname, "..", "node_modules", p.path);
  })
  .forEach(function(p) {
    functions.push(function() {
      memfs.vol.mkdirpSync(path.dirname(p));
      fs.createReadStream(p).pipe(memfs.vol.createWriteStream(p));
    });
  });

function home(...p) {
  return path.resolve(__dirname, "..", ...p);
}

progress.start(functions.length, 0)

let i = 0;

const interval = setInterval(function(){
  progress.increment();
  functions[i]();
  i++;
}, 0);

functions.push(function(){
  clearInterval(interval);
  const config = {
    target: "node",
    mode: "production",
    devtool: "inline-source-map",
    entry: {
      // app: home("app", "build", "web", "index.html"),
      server: home("server", "docker.js"),
      cli: home("cli", "build", "cli.js"),
      "cli-server": home("cli", "build", "server.js")
    },
    output: {
      path: path.resolve(__dirname, "out"),
      filename: "[name].js"
    },
    module: {
      rules: [
        {
          oneOf: [
            {
              test: /\.html$/,
              loader: htmlLoader
            }
          ]
        }
      ]
    },
    plugins: [
      new HardSourceWebpackPlugin(),
      new webpack.BannerPlugin({
        banner: "require('source-map-support').install();",
        raw: true
      }),
      new webpack.DefinePlugin({
        standaloneFs: memfs.vol.toJSON()
      })
    ],
    externals: ["uws"],
    optimization: {
      splitChunks: false
    }
  };
  const compiler = webpack(config);
  compiler.run();
});
