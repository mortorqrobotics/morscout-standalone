import { Team } from "models";
export default async (id: string) => {
  return await Team.findById(id);
};
