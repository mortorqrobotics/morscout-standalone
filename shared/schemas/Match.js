import { Schema } from "mongoose";

const Match = new Schema({
  redAlliance: {
    type: Schema.Types.ObjectId,
    ref: "Alliance"
  },
  blueAlliance: {
    type: Schema.Types.ObjectId,
    ref: "Alliance"
  },
  winner: {
    type: String,
    enum: ["Red", "Blue"]
  },
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  },
  Regional: {
    type: Schema.Types.ObjectId,
    ref: "Regional"
  }
});

export default Match;
