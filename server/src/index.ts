import socketIo from "socket.io";
import express from "express";
import { dirname, resolve } from "path";
import { Server } from "net";
import { createServer as https } from "https";
import httpAPI from "./api/http";
import ioAPI from "./api/io";
import { readFileSync } from "fs";
import generateCertificateKey from "./generateCert";
import configEmitter from "config";
import "cli";

const io: socketIo.Server = socketIo();

io.on("connection", (socket: socketIo.Socket) => {
  ioAPI(socket);
});

const app = express();
app.get("/config", (req, res) =>
  res.json({
    socketIO: ":" + configEmitter.config.port
  })
);
app.use("/api", httpAPI);

if (!configEmitter.config.development) {
  app.get(
    "/",
    express.static(resolve(dirname(require.resolve("client-web/")), "build"))
  );
  app.get("/", (req, res) =>
    res.sendFile(
      resolve(dirname(require.resolve("client-web/")), "build", "index.html")
    )
  );
}

let { certificate, key } =
  configEmitter.config.cert && configEmitter.config.key
    ? {
        key: readFileSync(configEmitter.config.key),
        certificate: readFileSync(configEmitter.config.cert)
      }
    : generateCertificateKey(configEmitter.config.hostname);
const Application = https(
  {
    cert: certificate,
    key: key
  },
  app
);

let server: Server = Application.listen(
  {
    port: configEmitter.config.port,
    host: configEmitter.config.hostname
  },
  () =>
    configEmitter.logger.info(
      `Started Server on port ${configEmitter.config.port}`
    )
);
configEmitter.on("changePort", (port: number) => {
  const tmpServer = Application.listen({
    port,
    hostname: configEmitter.config.hostname
  });
  server.close(() => {
    server = tmpServer;
  });
});
configEmitter.on("changeHostname", (hostname: string) => {
  const tmpServer = Application.listen({
    port: configEmitter.config.port,
    hostname
  });
  server.close(() => {
    server = tmpServer;
  });
});

const redirecter = express().use((req, res) =>
  res.redirect("https://" + req.headers.host + req.url)
);
let redirectServer: Server = redirecter.listen(
  configEmitter.config.redirectPort
);

configEmitter.on("changeRedirectPort", (port: number) => {
  const tmpServer = redirecter.listen(port);
  redirectServer.close(() => {
    server = tmpServer;
  });
});

if (configEmitter.config.port == configEmitter.config.socketPort)
  io.listen(server);
else io.listen(configEmitter.config.socketPort);
