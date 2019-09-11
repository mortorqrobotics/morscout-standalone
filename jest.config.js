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
    // Object.assign(
    //   {
    //     displayName: "Client Common"
    //   },
    //   require("./clients/common/jest.config")
    // ),
    Object.assign(
      {
        displayName: "Client Web"
      },
      require("./clients/web/jest.config")
    ),
    Object.assign(
      {
        displayName: "Client Electron"
      },
      require("./clients/electron/jest.config")
    ),
    Object.assign(
      {
        displayName: "Client React Native"
      },
      require("./clients/react-native/jest.config")
    ),
    Object.assign(
      {
        displayName: "shared"
      },
      require("./shared/jest.config")
    )
  ]
};
