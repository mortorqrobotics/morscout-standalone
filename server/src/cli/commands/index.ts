import yargs from "yargs";
import path from "path";
export default (yargs: yargs.Argv<{}>, IOStream, callback) =>
  yargs
    .command("echo", "Start up an app", {}, argv => {
      IOStream.log(argv._.slice(1).join(" "));
      callback(0);
    })
    .command(["cd [dir]"], "Change the current working directory", {}, argv => {
      try {
        process.chdir(path.resolve((argv.dir as string) || "."));
        callback(0);
      } catch {
        callback(1);
      }
    })
    .command("pwd", "gets the current working directory", {}, args => {
      IOStream.log(process.cwd());
      callback(0);
    })
    .command(
      "exit [code]",
      "Exit the morscout server with this code",
      {},
      args => {
        process.exit(typeof args.code == "number" ? args.code : 127);
      }
    )
    .command("$0", "the default command", {}, args => {
      if (args._.length > 0) {
        IOStream.log(`morscout: ${args._[0]}: command not found`);
        callback(127);
      } else callback(0);
    });
