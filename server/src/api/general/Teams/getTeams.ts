import { User, Team } from "models";
export default async socket => {
  return await Team.find(
    {
      registeredRegionals: (await Team.findById(
        (await User.findById(socket.user.id)).team
      )).regional
    },
    "+number"
  );
};
