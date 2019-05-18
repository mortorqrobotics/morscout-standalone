import * as mongoose from "mongoose";
import socketIo from "socket.io";
import express from "express";
import isDocker from "is-docker";
import { join as pathJoin } from "path";
import { createServer as http } from "http";
import { createServer as https } from "https";
import { createServer as http2 } from "http2";
import api from "./api";

if (isDocker()) {
  const development = process.env.NODE_ENV !== "production";
  const io = socketIo();

  io.on("connection", socket => {
    api.io(socket);
  });

  const app = express();
  app.use(
    "/api",
    api.server({
      mongoose
    })
  );

  // Main Route Handler(only if not DevServer)
  if (!development) {
    app.get(
      "/",
      express.static(pathJoin(__dirname, "..", "..", "app", "build", "web"))
    );
  }
  app.listen(80, port => console.log(`Started Server on port ${port}`));
} else {
  const development = process.env.NODE_ENV !== "production";
  const io = socketIo();

  io.on("connection", socket => {
    api.io(socket);
  });

  const app = express();
  app.use(
    "/api",
    api.server({
      mongoose
    })
  );
  io.listen(3002);
  console.log("Started Server");

  // Main Route Handler(only if not DevServer)
  if (!development) {
    app.get(
      "/",
      express.static(pathJoin(__dirname, "..", "..", "app", "build", "web"))
    );
  }
}
