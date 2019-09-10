import { model, Model } from "mongoose";
import allianceSchema, { IAlliance } from "Shared/schemas/Alliance";
import matchSchema, { IMatch } from "Shared/schemas/Match";
import regionalSchema, { IRegional } from "shared/schemas/Regional";
import seasonSchema, { ISeason } from "Shared/schemas/Season";
import teamSchema, { ITeam } from "Shared/schemas/Team";
import userSchema, { IUser } from "Shared/schemas/User";

export const Alliance: Model<IAlliance> = model("Alliance", allianceSchema);
export const Match: Model<IMatch> = model("Match", matchSchema);
export const Regional: Model<IRegional> = model("Regional", regionalSchema);
export const Season: Model<ISeason> = model("Season", seasonSchema);
export const Team: Model<ITeam> = model("Team", teamSchema);
export const User: Model<IUser> = model("User", userSchema);
