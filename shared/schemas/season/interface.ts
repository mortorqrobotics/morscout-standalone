import { Document } from "mongoose";

export default interface ISeason extends Document {
  year: number;
  name: string;
  buildStart: Date;
  buildEnd: Date;
  seasonStart: Date;
  seasonEnd: Date;
}
