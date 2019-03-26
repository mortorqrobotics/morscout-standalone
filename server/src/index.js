import socketIo from "socket.io";
import { join as pathJoin } from "path";
import express from "express";
import api from "./api";

export default imports => {
  const { development } = imports;
  const { mongoose } = imports.modules;
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
      express.static(pathJoin(__dirname, "..", "..", "app", "build", "web"))
    );
    app.get("*", (req, res) => {
      res.send("Hi!");
    });
  }
  return {
    app,
    io
  };
};
