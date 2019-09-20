import { Match } from "models";
import { Schema } from "mongoose";
export default async (id: string) => {
  return await Match.findById(id);
};
