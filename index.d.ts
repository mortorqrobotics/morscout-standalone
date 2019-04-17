// Type definitions for MorScout
// TypeScript Version: 2.2

/* =================== USAGE ===================
    import morscout from "morscout";
    var { app, io } = morscout();
 =============================================== */

/// <reference types="express" />
/// <reference types="socket.io" />
/// <reference types="mongoose" />
/// <reference types="serve-static" />

import mongoose from "mongoose";
import socketIo from "socket.io";

/**
 * Creates an MorSout application. The morscout() function is a top-level function exported by the MorScout module.
 */
declare function morscout(): morscout.morscoutServerType;

declare namespace morscout {
  /**
   *  Defines the struccture for the imports
   *
   * @interface importsType
   */
  interface importsType {
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
}

export = morscout;
