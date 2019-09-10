module.exports = {
  collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}", "!src/**/*.d.ts"],
  coveragePathIgnorePatterns: ["/node_modules"],
  resolver: "jest-pnp-resolver",
  testMatch: [
    "<rootDir>/**/__tests__/**/*.{js,jsx,ts,tsx}",
    "<rootDir>/**/?(*.)(spec|test).{js,jsx,ts,tsx}"
  ],
  testPathIgnorePatterns: ["/node_modules/"],
  testEnvironment: "node",
  testURL: "http://localhost",
  transform: {
    "^.+\\.(ts)$": "ts-jest",
    "^.+\\.(js)$": "<rootDir>/config/jest/babelTransform.js"
  },
  transformIgnorePatterns: ["[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$"],
  moduleFileExtensions: ["js", "ts", "json"],
  rootDir: __dirname
};
