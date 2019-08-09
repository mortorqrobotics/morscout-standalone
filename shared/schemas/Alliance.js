import { Schema } from "mongoose";

const Alliance = new Schema({
  teams: [
    {
      type: Schema.Types.ObjectId,
      ref: "Team",
      required: true
    }
  ]
});

export default Alliance;
