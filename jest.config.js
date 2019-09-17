const projects = [
  "server",
  "shared",
  // "clients/common",
  "clients/web",
  "clients/electron",
  "clients/react-native"
];

module.exports = {
  collectCoverageFrom: ["**/src/**/*.{js,jsx,ts,tsx}", "!**/src/**/*.d.ts"],
  rootDir: __dirname,
  projects
};
