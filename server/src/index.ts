import * as mongoose from "mongoose";
import socketIo from "socket.io";
import express from "express";
import { dirname } from "path";
import { Server } from "net";
import { createServer as https } from "https";
import { createSecureServer as http2 } from "http2";
import api from "./api";
import { readFileSync } from "fs";
import generateCertificateKey from "./generateCert";
import configEmitter from "config";

const io: socketIo.Server = socketIo();

io.on("connection", (socket: socketIo.Socket) => {
  api.io(socket);
});

const app = express();
app.use(
  "/api",
  api.server({
    mongoose
  })
);

app.get("/config", (req, res) =>
  res.json({
    io: configEmitter.config.port
  })
);

if (!configEmitter.config.development) {
  app.get("/", express.static(dirname(require.resolve("client-web"))));
  app.get("/", (req, res) => res.sendFile(require.resolve("client-web")));
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
  () => console.log(`Started Server on port ${configEmitter.config.port}`)
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
