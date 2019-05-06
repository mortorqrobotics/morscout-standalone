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
    enum: ["Red", "Blue"],
    default: null
  },
  startDate: {
    type: Date
  },
  endData: {
    type: Date,
    validate: date => this.startDate.time() < date.time()
  },
  Regional: {
    type: Schema.Types.ObjectId,
    ref: "Regional"
  }
});

export default Match;
