import { model } from "mongoose";
import allianceSchema from "shared/schemas/Alliance";
import matchSchema from "shared/scheams/Match";
import regionalSchema from "shared/schemas/Regional";
import seasonSchema from "shared/scheams/Season";
import teamSchema from "shared/schemas/Team";
import userSchema from "shared/schemas/User";

export const Alliance = model("Alliance", allianceSchema);
export const Match = model("Match", matchSchema);
export const Regional = model("Regional", regionalSchema);
export const Season = model("Season", seasonSchema);
export const Team = model("Team", teamSchema);
export const User = model("User", userSchema);
