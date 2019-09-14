const resolve = require("./config/webpack.config");

module.exports = {
  // automock: true,
  preset: "@shelf/jest-mongodb",
  collectCoverageFrom: ["src/**/*.{js,ts}", "!src/**/*.d.ts"],
  resolver: "jest-pnp-resolver",
  testMatch: [
    "<rootDir>/src/**/__tests__/**/*{js,ts}",
    "<rootDir>/src/**/?(*.)(spec|test).{js,ts}"
  ],
  testEnvironment: "node",
  testURL: "http://localhost",
  transform: {
    "^.+\\.(ts)$": "ts-jest",
    "^.+\\.(js)$": "<rootDir>/config/jest/babelTransform.js"
  },
  transformIgnorePatterns: ["[/\\\\]node_modules[/\\\\].+\\.(js|ts)$"],
  moduleFileExtensions: ["js", "ts", "json", "node"],
  rootDir: __dirname,
  moduleNameMapper: Object.assign(
    Object.entries(resolve.resolve.alias).reduce(
      (p, v) => ({
        ...p,
        [`^${v[0]}(.*)$`]: `${v[1]}$1`
      }),
      {}
    ),
    {
      "^setup(.*)$": "<rootDir>/config/jest/setup$1",
      "^teardown(.*)$": "<rootDir>/config/jest/teardown$1"
    }
  )
};
