const resolve = require("./config/resolve");
module.exports = {
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
    "^.+\\.css$": "<rootDir>/config/jest/cssTransform.js",
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
        [`^${v[0]}(.*)$`]: `${v[1]}$1`
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
