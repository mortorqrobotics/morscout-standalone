module.exports = {
  collectCoverageFrom: ["**/*.{js,jsx,ts,tsx}", "!**/*.d.ts"],
  coveragePathIgnorePatterns: [
    "/node_modules",
    "/coverage/",
    "<rootDir>/jest.config.js",
    "/scripts/"
  ],
  resolver: "jest-pnp-resolver",
  testMatch: [
    "<rootDir>/**/__tests__/**/*.{js,jsx,ts,tsx}",
    "<rootDir>/**/?(*.)(spec|test).{js,jsx,ts,tsx}"
  ],
  testPathIgnorePatterns: ["/node_modules/", "/scripts/"],
  testEnvironment: "node",
  testURL: "http://localhost",
  transform: {
    "^.+\\.(ts)$": "ts-jest",
    "^.+\\.(js)$": "<rootDir>/../node_modules/babel-jest"
  },
  transformIgnorePatterns: ["[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$"],
  moduleFileExtensions: ["js", "ts", "json"]
};
