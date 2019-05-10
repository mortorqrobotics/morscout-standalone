import socketIo from "socket.io";
import { join as pathJoin } from "path";
import express from "express";
import { createServer as http } from "http";
import { createServer as https } from "https";
import { createServer as http2 } from "http2";
import * as mongoose from "mongoose";
import isDocker from "is-docker";
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

  // Main Route Handler(only if not DevServer)
  if (!development) {
    app.get(
      "/",
      express.static(pathJoin(__dirname, "..", "..", "app", "build", "web"))
    );
  }
}

console.log("HI!!!")
