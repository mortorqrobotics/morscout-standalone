require("source-map-support").install();
const assets = require("./build/asset-manifest.json");

// eslint-disable-next-line
module.exports = exports = require(`./build${assets['server.js']}`);
