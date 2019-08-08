const path = require("path");

const getSrc = (...p) => path.join(__dirname, "src", ...p);

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
    "^.+\\.(js|jsx)$": "<rootDir>/../node_modules/babel-jest",
    "^.+\\.css$": "<rootDir>/config/jest/cssTransform.js",
    "^(?!.*\\.(js|jsx|ts|tsx|css|json)$)":
      "<rootDir>/config/jest/fileTransform.js"
  },
  transformIgnorePatterns: [
    "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$",
    "^.+\\.module\\.(css|sass|scss)$"
  ],
  moduleNameMapper: {
    "^react-native$": "react-native-web",
    "^screen(.*)$": getSrc("screens", "$1"),
    "^~/(.*)$": getSrc("components", "$1"),
    "^@/(.*)$": getSrc("polyfills", "$1"),
    "^style(.*)$": getSrc("style", "$1"),
    "^store(.*)$": getSrc("redux-state", "store", "$1"),
    "^reducers(.*)$": getSrc("redux-state", "reducers", "$1"),
    "^actions/(.*)$": getSrc("redux-state", "actions", "$1"),
    "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",
    "^uranium": getSrc("uranium")
  },
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
