import { Schema } from "mongoose";
import IAlliance from "./interface";

export default new Schema<IAlliance>({
  teams: [
    {
      type: Schema.Types.ObjectId,
      ref: "Team",
      required: true
    }
  ]
});
