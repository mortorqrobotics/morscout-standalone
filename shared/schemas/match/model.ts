import { Schema } from "mongoose";
import IMatch from "./interface";

export default new Schema<IMatch>({
  redAlliance: {
    type: Schema.Types.ObjectId,
    ref: "Alliance",
    required: true
  },
  blueAlliance: {
    type: Schema.Types.ObjectId,
    ref: "Alliance",
    required: true
  },
  winner: {
    type: String,
    enum: ["Red", "Blue"]
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  Regional: {
    type: Schema.Types.ObjectId,
    ref: "Regional",
    required: true
  }
});
