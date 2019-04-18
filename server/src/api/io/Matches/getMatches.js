import { Schema } from "mongoose";
import modelFunc from "models";
export default async (socket, { mongoose }) => {
  const { Team, Regional, User, Match } = modelFunc(mongoose);
  return await Match.find({
    _id: {
      $in: await Regional.findById(
        await Team.findById(await User.findById(socket.User.id).team).regional
      ).matches.map(id => Schema.Types.ObjectId(id))
    }
  });
};
