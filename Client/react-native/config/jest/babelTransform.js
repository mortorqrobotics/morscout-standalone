// @remove-file-on-eject
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const babelJest = require("babel-jest");
const fs = require("fs");
const path = require("path");

module.exports = babelJest.createTransformer(
  JSON.parse(fs.readFileSync(path.resolve(__dirname, "..", "..", ".babelrc")))
);
