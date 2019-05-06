import { Schema } from "mongoose";
import { Team, Regional, User, Match } from "models";
export default async socket => {
  return [
    {
      teams: { blue: ["Hi"], red: ["Red"] },
      time: new Date(),
      progress: { max: 1, current: 1 }
    }
  ];
  // return await Match.find({
  //   _id: {
  //     $in: await Regional.findById(
  //       await Team.findById(await User.findById(socket.User.id).team).regional
  //     ).matches.map(id => Schema.Types.ObjectId(id))
  //   }
  // });
};
