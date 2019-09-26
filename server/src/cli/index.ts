import install from "./install";
import configEmitter from "config";

process.stdin.setEncoding("utf8");
process.stdin.on("data", (key: string) => {
  key = key.toLowerCase();
  if (key == "i") {
    install();
  }
});

console.info("Press i to Setup the database");
