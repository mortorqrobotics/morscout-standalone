import { Team } from "models";
import { Schema } from "mongoose";
export default async (id: Schema.Types.ObjectId) => {
  return await Team.findById(id);
};
