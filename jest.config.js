module.exports = {
  collectCoverageFrom: ["**/src/**/*.{js,jsx,ts,tsx}", "!**/src/**/*.d.ts"],
  watchPlugins: ["jest-watch-select-projects"],
  projects: [
    Object.assign(
      {
        displayName: "Server"
      },
      require("./server/jest.config")
    ),
    Object.assign(
      {
        displayName: "Client"
      },
      require("./app/jest.config")
    ),
    Object.assign(
      {
        displayName: "Shared"
      },
      require("./shared/jest.config")
    )
  ]
};
