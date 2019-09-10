import { Schema } from "mongoose";
import { Regional, Match } from "models";
export default async (regionalId: string) => {
  return await Match.find(
    {
      regional: regionalId
    },
    "+startDate"
  );
};
