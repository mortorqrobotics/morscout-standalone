const inquirer = require("inquirer");
const shell = require("shelljs");

if (shell.which("emulator")) {
  shell.exec(
    "emulator -list-avds",
    {
      silent: true,
    },
    (code, out) => {
      if (code !== 0) console.error(out);
      else {
        const avds = out.split("\n").filter(avd => avd !== "");

        inquirer
          .prompt([
            {
              message: "AVD",
              name: "avd",
              type: "list",
              choices: avds,
            },
          ])
          .then(({ avd }) => {
            shell.exec(`emulator -avd ${avd}`, {
              silent: true,
              async: true,
            });
            process.exit();
          });
      }
    },
  );
} else {
  console.error("You must have Android Studio installed to run the emulator");
}
