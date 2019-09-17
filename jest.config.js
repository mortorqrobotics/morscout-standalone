const projects = [
  "shared",
  "server",
  // "clients/common",
  "clients/web",
  "clients/electron",
  "clients/react-native"
];

module.exports = {
  collectCoverageFrom: [
    "**/{types,schemas,src}/**/*.{js,jsx,ts,tsx}",
    "!**/{types,schemas,src}/**/*.d.ts"
  ],
  rootDir: __dirname,
  projects
};
