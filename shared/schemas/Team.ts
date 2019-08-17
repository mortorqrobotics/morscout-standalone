import * as mongoose from "mongoose";
import { pointSchema } from "./util/GeoJSON";

const Team: mongoose.Schema = new mongoose.Schema({
  name: {
    // The team name
    type: String,
    required: true
  },
  number: {
    // Just the team number
    type: Number,
    validate: [
      num =>
        Number.isSafeInteger(num) &&
        Number.isFinite(num) &&
        !Number.isNaN(num) &&
        num > 0 &&
        num <= 9999,
      "{ Value } is not a legal team number"
    ],
    required: true
  },
  /**
   * Awards the team has earned
   * Format:
   * {
   *    year: ["Awards"]
   * }
   */
  awards: {
    type: Map,
    required: true,
    default: new Map()
  },
  // List of Registered Regionals
  registeredRegionals: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Regional"
    }
  ],
  location: {
    type: pointSchema,
    required: true
  }
});

export default Team;
