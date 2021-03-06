const resolve = require("./config/resolve");
const escape = require("escape-string-regexp");

module.exports = {
  collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}", "!src/**/*.d.ts"],
  resolver: "jest-pnp-resolver",
  browser: true,
  // setupFiles: ["react-app-polyfill/jsdom"],
  testMatch: [
    "<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}",
    "<rootDir>/src/**/?(*.)(spec|test).{js,jsx,ts,tsx}"
  ],
  testEnvironment: "jsdom",
  testURL: "http://localhost",
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
    "^.+\\.(js|jsx)$": "<rootDir>/config/jest/babelTransform.js",
    "^.+\\.css$": "<rootDir>/config/jest/cssTransform.js",
    "^(?!.*\\.(js|jsx|ts|tsx|css|json)$)":
      "<rootDir>/config/jest/fileTransform.js"
  },
  transformIgnorePatterns: [
    // "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$",
    "^.+\\.module\\.(css|sass|scss)$"
    // "![/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$"
  ],
  moduleNameMapper: Object.assign(
    Object.entries(resolve.alias).reduce((p, v) => {
      if (v[0] === "react") return p;
      if (v[0].length == 1) v[0] = `${v[0]}/`;
      v[0] = escape(v[0]);
      return {
        ...p,
        [`^${v[0]}(.*)$`]: `${v[1]}/$1`
      };
    }, {})
  ),
  moduleFileExtensions: [
    "web.js",
    "js",
    "web.ts",
    "ts",
    "web.tsx",
    "tsx",
    "json",
    "web.jsx",
    "jsx"
  ],
  coveragePathIgnorePatterns: ["uranium"],
  rootDir: __dirname,
  setupFiles: ["<rootDir>/config/jest/setup.js"]
};
