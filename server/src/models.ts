import { model, Model } from "mongoose";
import allianceSchema, { IAlliance } from "shared/schemas/alliance";
import matchSchema, { IMatch } from "shared/schemas/match";
import regionalSchema, { IRegional } from "shared/schemas/regional";
import seasonSchema, { ISeason } from "shared/schemas/season";
import teamSchema, { ITeam } from "shared/schemas/team";
import userSchema, { IUser } from "shared/schemas/user";

export const Alliance: Model<IAlliance> = model("Alliance", allianceSchema);
export const Match: Model<IMatch> = model("Match", matchSchema);
export const Regional: Model<IRegional> = model("Regional", regionalSchema);
export const Season: Model<ISeason> = model("Season", seasonSchema);
export const Team: Model<ITeam> = model("Team", teamSchema);
export const User: Model<IUser> = model("User", userSchema);
