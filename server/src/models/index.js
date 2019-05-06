import * as mongoose from "mongoose";

import MatchSchema from "./Match";
import RegionalSchema from "./Regional";
import TeamSchema from "./Team";
import UserSchema from "./User";

export const Match = mongoose.model("Match", MatchSchema);
export const Regional = mongoose.model("Regional", RegionalSchema);
export const Team = mongoose.model("Team", TeamSchema);
export const User = mongoose.model("User", UserSchema);
