/*
 * This is just a worker to run the server as a deamon
 */
import https from "https";
import yargs from "yargs-parser";
import express from "express";
import mongoose from "mongoose";

(async () => {
  try {
    mongoose.connect("mongodb://localhost:27017");
    const { app } = (await import("server")).default({
      modules: {
        mongoose,
      },
    });
    const m = yargs(process.argv.slice(2));
    let secure = m.secure || m.s;
    const port = m.port || m.p;
    const redir = m.redirect || m.r;
    let server;
    let s = app;
    if (redir) {
      s = express();
      s.use("*", (req, res) => {
        res.redirect(
          (secure ? "https://" : "http://") + req.headers.host + req.url,
        );
      });
      secure = !secure;
    }
    if (secure) {
      server = https.createServer(s);
      server.listen(port);
    } else server = s.listen(port || 0);
    // eslint-disable-next-line
    console.log('listening on port %s.', server.address().port);
    ["SIGINT", "SIGTERM"].forEach(sig => {
      process.on(sig, () => {
        process.exit();
      });
    });
  } catch (e) {
    console.log(e);
  }
})();
