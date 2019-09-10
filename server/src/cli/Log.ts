import blessed from "blessed";
import contrib from "blessed-contrib";
import { Writable } from "stream";
import configEmitter from "config";
import winston from "winston";
import { WritableStreamBuffer } from "stream-buffers";

let logging: boolean = false;

export default screen => {
  screen.program.clear();
  screen.render();
  const log = blessed.log({
    label: "Server Log",
    border: { type: "line" },
    height: "100%-1"
  });
  logging = true;
  logStream.setLog(log);
  screen.append(log);
  log.on("detach", () => (logging = false));
};

class LogStream extends Writable {
  constructor() {
    super();
    this.buffer = [];
  }
  buffer: string[];
  log: blessed.Widgets.Log | contrib.Widgets.LogElement;
  _write(chunk: Buffer, encoding, callback) {
    if (chunk) {
      this.buffer.push(chunk.toString().replace("\n", ""));
      if (this.log && logging) {
        this.log.log(chunk.toString().replace("\n", ""));
      }
    }
    callback();
  }
  setLog(log: blessed.Widgets.Log | contrib.Widgets.LogElement) {
    this.log = log;
    // console.log(this.buffer.join("\n"));
    try {
      process.nextTick(() => this.buffer.forEach(line => log.log(line)));
    } catch {}
  }
}
const logStream = new LogStream();

configEmitter.logger.add(
  new winston.transports.Stream({
    stream: logStream
  })
);
