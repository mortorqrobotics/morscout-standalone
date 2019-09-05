import { Widgets } from "blessed";
import { homedir } from "os";
import yargs from "yargs";
import Yargs from "yargs/yargs";
import commands from "./commands";

export type command = (
  IOStream: IOStream,
  callback: (code: number) => void
) => yargs.CommandModule<{}, unknown>;

class IOStream {
  private terminal: Widgets.BoxElement | undefined;
  private buffer: string;
  constructor() {
    this.buffer = "";
  }
  public write(chunk) {
    const { terminal } = this;
    terminal.setContent(terminal.getContent() + chunk);
    terminal.render();
    terminal.screen.render();
  }

  public delete(size: number = 1) {
    const { terminal } = this;
    const content = terminal.getContent();
    terminal.setContent(content.substring(0, content.length - size));
    terminal.render();
    terminal.screen.render();
  }
  public read(size) {
    const { buffer } = this;
    buffer.substr(0, size);
    this.buffer = buffer.substring(size);
  }
  public log(...stuff) {
    this.write(stuff.join(" ") + "\n");
  }
  public setTerminal(terminal: Widgets.BoxElement) {
    this.terminal = terminal;
  }
}

let stdStream: IOStream = new IOStream();

let blink: boolean = false;
let blinkInterval;
function commandCallback(code) {
  runningCommand = false;
  const cwd =
    process.cwd().indexOf(homedir()) === 0
      ? "~" + process.cwd().substring(homedir().length)
      : process.cwd();
  stdStream.write(`[${new Date().toLocaleString()}] morcout:${cwd}$ `);
  blink = false;
  clearInterval(blinkInterval);
  blinkInterval = setInterval(() => {
    if (!runningCommand) {
      blink = !blink;
      if (!blink) stdStream.delete(1);
      else stdStream.write("█");
    }
  }, 1000);
}
let runningCommand: boolean = false;
let y = Yargs([], process.cwd());
export default function addCommand(command): void {
  y = command(yargs, stdStream, commandCallback);
}
addCommand(commands);

export const terminalControl = (terminal: Widgets.BoxElement, log) => {
  let timeout: boolean = false;
  let command: string = "";
  let escaped: boolean = false;
  stdStream.setTerminal(terminal);
  commandCallback(0);
  terminal.on("keypress", (key: string | undefined) => {
    if (
      key &&
      !(timeout && (key.charCodeAt(0) == 13 || key.charCodeAt(0) == 127))
    ) {
      if (runningCommand) stdStream.write(key);
      else if (escaped) {
        if (key.charCodeAt(0) != 127) {
          command += key;
        }
        escaped = false;
      } else {
        switch (key.charCodeAt(0)) {
          case 13:
            if (blink) stdStream.delete();
            terminal.setContent(terminal.getContent() + key);
            runningCommand = true;
            y.parse(command);
            command = "";
            break;
          case 127:
            if (command) {
              const content = terminal.getContent();
              terminal.setContent(content.substring(0, content.length - 1));
            }
            command = command.substring(0, command.length - 1);
            break;
          case 92:
            escaped = true;
            break;
          default:
            command += key;
            break;
        }
      }
      if (key.charCodeAt(0) == 13 || key.charCodeAt(0) == 127) {
        timeout = true;
        setTimeout(() => (timeout = false), 50);
      }
      if (blink) stdStream.delete(1);
      stdStream.write(key.charCodeAt(0) !== 127 ? key : "");
      if (blink) stdStream.write("█");
      terminal.render();
      terminal.screen.render();
    }
    return false;
  });
};
