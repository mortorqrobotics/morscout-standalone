import blessed from "blessed";
// import config from "config";
import contrib from "blessed-contrib";
import { terminalControl } from "./terminal";
import { Writable } from "stream";

export const screen = blessed.screen({
  smartCSR: true,
  fullUnicode: true,
  dockBorders: true,
  ignoreDockContrast: true,
  title: "morscout"
});
screen.key(["escape", "C-c"], function(ch, key) {
  screen.destroy();
  process.exit(0);
});

export const terminalBox = blessed.box({
  parent: screen,
  border: {
    type: "line"
  },
  width: "50%",
  left: "50%"
});

export const logText = contrib.log({
  parent: screen,
  label: "Server Log",
  border: { type: "line" },
  width: "50%"
});

terminalControl(terminalBox, logText);

class LogStream extends Writable {
  constructor(options) {
    super(options);
    this.log = options.log;
  }
  log: blessed.Widgets.Log;
  _write(chunk, encoding, callback) {
    try {
      this.log.log(chunk);
    } catch {}
  }
}
export const logStream = new LogStream({ log: logText });

screen.key(["escape", "C-c"], function(ch, key) {
  screen.destroy();
  return process.exit(0);
});
