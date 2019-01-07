import { Schema } from "mongoose";

export default mongoose => {
  const TeamSchema = new Schema({
    name: {
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
          num > 0,
        message: "{ Value } is not a legal team number"
      }
    },
    awards: {
      Type: Map
    }
  });

  return mongoose.model("Team", TeamSchema);
};
