import { User, Team } from "models";
export default async userId => {
  if (!userId) return;
  return await Team.find(
    {
      registeredRegionals: (await Team.findById(
        (await User.findById(userId)).team
      )).regional
    },
    "+number"
  );
};
