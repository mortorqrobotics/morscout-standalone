import { Document } from "mongoose";
import ITeam from "../t eam/interface";

export default interface IUser extends Document {
  comparePassword(password: string): Promise<boolean>;
  username: string;
  password: string;
  mobileDeviceTokens: string[];
  firstname: string;
  lastname: string;
  team: ITeam["_id"];
  phone: number;
  email: string;
}
