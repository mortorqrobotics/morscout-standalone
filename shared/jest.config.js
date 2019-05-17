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
    "^.+\\.(ts|tsx)$": "ts-jest",
    "^.+\\.(js|jsx)$": "<rootDir>/../node_modules/babel-jest"
  },
  transformIgnorePatterns: ["[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$"],
  moduleNameMapper: {
    "^react-native$": "react-native-web"
  },
  moduleFileExtensions: [
    "web.js",
    "js",
    "web.ts",
    "ts",
    "web.tsx",
    "tsx",
    "json",
    "web.jsx",
    "jsx",
    "node"
  ]
};
