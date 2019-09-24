import { Document } from "mongoose";
import IAlliance from "../alliance/interface";
import IRegional from "../regional/interface";

interface IMatch extends Document {
  redAlliance: IAlliance["_id"];
  blueAlliance: IAlliance["_id"];
  winner: "Red" | "Blue";
  startDate: Date;
  endDate: Date;
  Regional: IRegional["_id"];
}

export default IMatch;
