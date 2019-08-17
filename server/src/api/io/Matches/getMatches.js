import { Schema } from "mongoose";
import { Team, Regional, User, Match } from "models";
export default async socket => {
  return await Match.find(
    {
      _id: {
        $in: await Regional.findById(
          await Team.findById(await User.findById(socket.user.id).team).regional
        ).matches.map(id => new Schema.Types.ObjectId(id))
      }
    },
    "+startDate"
  );
};
