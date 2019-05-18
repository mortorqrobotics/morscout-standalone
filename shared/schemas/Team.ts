import * as mongoose from "mongoose";
import { pointSchema } from "./util/GeoJSON";

const Team: mongoose.Schema = new mongoose.Schema({
  name: {
    // The team name
    type: String
  },
  number: {
    // Just the team number
    type: Number,
    validate: {
      validator: num =>
        Number.isSafeInteger(num) &&
        Number.isFinite(num) &&
        !Number.isNaN(num) &&
        num > 0 &&
        num <= 9999,
      message: "{ Value } is not a legal team number"
    }
  },
  /**
   * Awards the team has earned
   * Format:
   * {
   *    year: ["Awards"]
   * }
   */
  awards: {
    Type: Map
  },
  // List of Registered Regionals
  registeredRegionals: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Regional"
    }
  ],
  location: pointSchema
});

export default Team;
