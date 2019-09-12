const resolve = require("./config/webpack.config");

module.exports = {
  collectCoverageFrom: ["src/**/*.{js,ts}", "!src/**/*.d.ts"],
  resolver: "jest-pnp-resolver",
  testMatch: [
    "<rootDir>/src/**/__tests__/**/*.{js,ts}",
    "<rootDir>/src/**/?(*.)(spec|test).{js,ts}"
  ],
  setupFiles: ["<rootDir>/config/jest/setup/mongoose.js"],
  testEnvironment: "node",
  testURL: "http://localhost",
  transform: {
    "^.+\\.(ts)$": "ts-jest",
    "^.+\\.(js)$": "<rootDir>/config/jest/babelTransform.js"
  },
  transformIgnorePatterns: ["[/\\\\]node_modules[/\\\\].+\\.(js|ts)$"],
  moduleFileExtensions: ["js", "ts", "json", "node"],
  rootDir: __dirname,
  moduleNameMapper: Object.entries(resolve.resolve.alias).reduce(
    (p, v) => ({
      ...p,
      [`^${v[0]}(.*)$`]: `${v[1]}$1`
    }),
    {}
  )
};
