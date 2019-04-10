import { Schema } from "mongoose";
import { pointSchema } from "./util/GeoJSON";

export default mongoose => {
  const TeamSchema = new Schema({
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
          Number.isNaN(num) &&
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
        type: Schema.Types.ObjectID,
        ref: "Regional"
      }
    ],
    location: pointSchema
  });

  return mongoose.model("Team", TeamSchema);
};
