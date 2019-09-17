import { Match } from "models";
export default async (regionalId: string) => {
  return await Match.find(
    {
      Regional: regionalId
    },
    "+startDate"
  );
};
