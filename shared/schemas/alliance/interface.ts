import { Document } from "mongoose";
import ITeam from "../Team/interface";

type team = ITeam["_id"];
export default interface IAlliance extends Document {
  teams: [team, team, team] | [team, team, team, team];
}
