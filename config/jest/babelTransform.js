// @remove-file-on-eject
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const babelJest = require("babel-jest");

module.exports = babelJest.createTransformer({
  presets: [
    require.resolve("babel-preset-react-app"),
    require.resolve("@babel/react"),
  ],
  plugins: [
    [
      require.resolve("@babel/plugin-proposal-class-properties"),
      { loose: false },
    ],
  ],
  babelrc: false,
  configFile: false,
});
