module.exports = {
  collectCoverageFrom: ["src/**/*.{js,jsx,mjs}"],
  setupFiles: ["<rootDir>/config/polyfills.js"],
  testMatch: [
    "**/__tests__/**/*.{js,jsx,mjs}",
    "**/?(*.)(spec|test).{js,jsx,mjs}",
  ],
  roots: ["<rootDir>/src"],
  testEnvironment: "node",
  testURL: "http://localhost",
  transform: {
    "^.+\\.(js|jsx|mjs)$": "<rootDir>/config/jest/babelTransform.js",
    "^.+\\.css$": "<rootDir>/config/jest/cssTransform.js",
    "^.+\\.(graphql)$": "<rootDir>/config/jest/graphqlTransform.js",
    "^(?!.*\\.(js|jsx|mjs|css|json|graphql)$)":
      "<rootDir>/config/jest/fileTransform.js",
  },
  transformIgnorePatterns: [
    "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs)$",
    "^.+\\.module\\.css$",
  ],
  moduleNameMapper: {
    "^react-native$": "react-native-web",
    "^.+\\.module\\.css$": "identity-obj-proxy",
  },
  moduleFileExtensions: [
    "web.js",
    "mjs",
    "js",
    "json",
    "web.jsx",
    "jsx",
    "node",
  ],
};
