import { Match } from "models";
import { Schema } from "mongoose";
export default async (id: Schema.Types.ObjectId) => {
  return await Match.findById(id);
};
