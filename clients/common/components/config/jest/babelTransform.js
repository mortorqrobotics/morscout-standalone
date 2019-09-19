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
    "@babel/react",
    [
      "@babel/env",
      {
        corejs: 3,
        useBuiltIns: "entry"
      }
    ]
  ],
  plugins: [
    "@babel/plugin-proposal-object-rest-spread",
    "@babel/plugin-syntax-dynamic-import",
    [
      "@babel/plugin-proposal-decorators",
      {
        legacy: true
      }
    ],
    [
      "@babel/plugin-proposal-class-properties",
      {
        loose: false
      }
    ]
  ]
});
