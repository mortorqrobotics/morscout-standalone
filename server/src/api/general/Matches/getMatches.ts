import { Schema } from "mongoose";
import { Regional, Match } from "models";
export default async (regionalId: string) => {
  return await Match.find(
    {
      _id: {
        $in: await Regional.findById(regionalId).matches.map(
          id => new Schema.Types.ObjectId(id)
        )
      }
    },
    "+startDate"
  );
};
