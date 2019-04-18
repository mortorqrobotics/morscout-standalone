import socketIo from "socket.io";
import { join as pathJoin } from "path";
import express from "express";
import { createServer as http } from "http";
import { createServer as https } from "https";
import { createServer as http2 } from "http2";
import mongoose from "mongoose";
import isDocker from "is-docker";
import api from "./api"
/**
 *  Defines the struccture for the imports
 *
 * @interface importsType
 */
interface optionsType {
  development: boolean,
  modules: {
    mongoose: mongoose.Connection
  }
}
/**
 *  Defines the structure for the morscout server import
 *
 * @interface morscoutServer
 */
interface morscoutServerType {
  app: Express.Application,
  io: socketIo.Server
}

/**
 *  Creates a MorScout Server Instance
 *
 * @param {optionsType} options options for creating the MorScout server
 * @returns {morscoutServerType}
 */
function server(options: optionsType):morscoutServerType {
  const { development } = options;
  const { mongoose } = options.modules;
  const io = socketIo();

  io.on("connection", socket => {
    api.io(socket, {mongoose});
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
    app.get("/",
      express.static(pathJoin(__dirname, "..", "..", "app", "build", "web"))
    );
  }
  return {
    app,
    io
  };
}
export default server;

if (require.main === module) {
  if (isDocker()) {
    const imports: optionsType = {
      development: process.env.PRODUCTION !== "true",
      modules: {
        mongoose: mongoose.createConnection("mongodb://morscout@mongodb:27017/MorScout")
      }
    };
    const { app, io } = server(imports);
    const server2 = http2(app);
    io.listen(server2);
  }
}
