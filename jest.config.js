module.exports = {
  collectCoverageFrom: ["**/src/**/*.{js,jsx,ts,tsx}", "!**/src/**/*.d.ts"],
  watchPlugins: ["jest-watch-select-projects"],
  projects: [
    Object.assign(
      {
        displayName: "Server"
      },
      require("./Server/jest.config")
    ),
    Object.assign(
      {
        displayName: "Client Common"
      },
      require("./Client/common/jest.config")
    ),
    Object.assign(
      {
        displayName: "Client Web"
      },
      require("./Client/web/jest.config")
    ),
    Object.assign(
      {
        displayName: "Client Electron"
      },
      require("./Client/electron/jest.config")
    ),
    Object.assign(
      {
        displayName: "Client React Native"
      },
      require("./Client/react-native/jest.config")
    ),
    Object.assign(
      {
        displayName: "Shared"
      },
      require("./Shared/jest.config")
    )
  ]
};
