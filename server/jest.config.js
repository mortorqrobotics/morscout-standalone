const path = require("path");

const getSrc = (...p) => path.join(__dirname, "src", ...p);

module.exports = {
  collectCoverageFrom: ["src/**/*.{js,ts}", "!src/**/*.d.ts"],
  resolver: "jest-pnp-resolver",
  testMatch: [
    "<rootDir>/src/**/__tests__/**/*.{js,ts}",
    "<rootDir>/src/**/?(*.)(spec|test).{js,ts}"
  ],
  testEnvironment: "node",
  testURL: "http://localhost",
  transform: {
    "^.+\\.(ts)$": "ts-jest",
    "^.+\\.(js)$": "<rootDir>/../node_modules/babel-jest",
    "^(?!.*\\.(js|ts|json)$)": "<rootDir>/config/jest/fileTransform.js"
  },
  transformIgnorePatterns: ["[/\\\\]node_modules[/\\\\].+\\.(js|ts)$"],
  moduleNameMapper: {
    "^shared(.*)$": getSrc("shared", "src", "$1")
  },
  moduleFileExtensions: ["js", "ts", "json", "node"],
  rootDir: __dirname
};
