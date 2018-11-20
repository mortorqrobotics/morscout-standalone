import inquirer from "inquirer";
import yargs from "yargs-parser";
import commandPrompt from "inquirer-command-prompt";

import start from "cmds/start";
import exit from "cmds/exit";
import stop from "cmds/stop";

inquirer.registerPrompt("command", commandPrompt);
global.message = "morscout >";
const cmds = {
  start,
  exit,
  stop,
  kill: stop,
};
const history = [];
const cmdsL = Object.keys(cmds);

function prompt() {
  inquirer
    .prompt([
      {
        type: "command",
        name: "cmd",
        message: global.message,
        autoCompletion: cmdsL,
        validate: val =>
          cmdsL.indexOf(val.split(" ")[0]) >= 0
            ? true
            : "If you don't know the available commands, type help for help",
      },
    ])
    .then(data => {
      let args = data.cmd.split(" ");

      const cmd = args.splice(0, 1);
      args = yargs(args);
      history.push(cmd, args);
      cmds[cmd](args);
      prompt();
    });
}

const argv = yargs(process.argv.slice(1));

try {
  let args = process.argv.slice(2);
  args = yargs(args);
  const [cmd] = args._;
  cmds[cmd](args);
} catch (err) {
  // eslint-disable-next-line
  console.log(err);
}
if (!(argv.u || argv.uninteractive)) prompt();
