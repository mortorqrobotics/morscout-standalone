module.exports = {
  collectCoverageFrom: ["*/**/*.{js,jsx,ts,tsx}", "!*/**/*.d.ts"],
  resolver: "jest-pnp-resolver",
  // browser: true,
  // setupFiles: ["react-app-polyfill/jsdom"],
  testMatch: [
    "<rootDir>/**/__tests__/**/*.{js,jsx,ts,tsx}",
    "<rootDir>/**/?(*.)(spec|test).{js,jsx,ts,tsx}"
  ],
  // testEnvironment: "jsdom",
  testURL: "http://localhost",
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
    "^.+\\.(js|jsx)$": "<rootDir>/config/jest/babelTransform.js"
  },
  transformIgnorePatterns: [
    "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$",
    "^.+\\.module\\.(css|sass|scss)$",
    "!node_modules/(?!(shared)/)"
  ],
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
  moduleNameMapper: {
    "^uranium$": "<rootDir>/uranium/src"
  },
  coveragePathIgnorePatterns: ["uranium"],
  rootDir: __dirname
};
