const inquirer = require("inquirer");
const shell = require("shelljs");

if (shell.which("emulator")) {
  shell.exec(
    "emulator -list-avds",
    {
      silent: true
    },
    (code, out) => {
      if (code !== 0) {
        const err = new Error(out);
        err.name = code;
        throw err;
      } else {
        const avds = out.split("\n").filter(avd => avd !== "");

        inquirer
          .prompt([
            {
              message: "AVD",
              name: "avd",
              type: "list",
              choices: avds
            }
          ])
          .then(({ avd }) => {
            shell.exec(`emulator -avd ${avd}`, {
              silent: true,
              async: true
            });
            process.exit();
          });
      }
    }
  );
} else {
  throw new Error("You must have Android Studio installed to run the emulator");
}
