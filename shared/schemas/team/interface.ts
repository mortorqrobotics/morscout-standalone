import { Document } from "mongoose";
import IRegional from "../regional/interface";
export default interface ITeam extends Document {
  name: string;
  number: number;
  awards: Map<number, string[]>;
  regional: IRegional["_id"];
}
