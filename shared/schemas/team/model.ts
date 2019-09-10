import { Schema } from "mongoose";
import { pointSchema } from "../util/geojson";
import ITeam from "./interface";

export default new Schema<ITeam>({
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
      type: Schema.Types.ObjectId,
      ref: "Regional"
    }
  ],
  location: {
    type: pointSchema,
    required: true
  },
  regional: {
    type: String
  }
});
