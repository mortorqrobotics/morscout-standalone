import { model } from "mongoose";
import allianceSchema from "Shared/schemas/Alliance";
import matchSchema from "Shared/schemas/Match";
import regionalSchema from "Shared/schemas/Regional";
import seasonSchema from "Shared/schemas/Season";
import teamSchema from "Shared/schemas/Team";
import userSchema from "Shared/schemas/User";

export const Alliance = model("Alliance", allianceSchema);
export const Match = model("Match", matchSchema);
export const Regional = model("Regional", regionalSchema);
export const Season = model("Season", seasonSchema);
export const Team = model("Team", teamSchema);
export const User = model("User", userSchema);
