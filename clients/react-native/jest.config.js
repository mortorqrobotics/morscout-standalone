const resolve = require("./config/resolve");
const escape = require("escape-string-regexp");

module.exports = {
  preset: "react-native",
  collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}", "!src/**/*.d.ts"],
  resolver: "jest-pnp-resolver",
  browser: true,
  // setupFiles: ["react-app-polyfill/jsdom"],
  testMatch: [
    "<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}",
    "<rootDir>/src/**/?(*.)(spec|test).{js,jsx,ts,tsx}"
  ],
  testURL: "http://localhost",
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
    "^.+\\.(js|jsx)$": require.resolve("babel-jest"),
    "^(?!.*\\.(js|jsx|ts|tsx|css|json)$)":
      "<rootDir>/config/jest/fileTransform.js"
  },
  transformIgnorePatterns: [
    "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$",
    "^.+\\.module\\.(css|sass|scss)$"
  ],
  moduleNameMapper: Object.assign(
    Object.entries(resolve.alias).reduce(
      (p, v) => ({
        ...p,
        [`^${escape(v[0])}(.*)$`]: `${v[1]}/$1`
      }),
      {}
    )
  ),
  moduleFileExtensions: [
    "native.js",
    "js",
    "native.ts",
    "ts",
    "json",
    "native.jsx",
    "jsx",
    "native.tsx",
    "tsx"
  ],
  coveragePathIgnorePatterns: ["uranium"],
  rootDir: __dirname
};
