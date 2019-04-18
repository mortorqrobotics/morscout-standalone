import Team from "./Team";

export default ({ mongoose }) => ({
  Team: Team(mongoose),
  User: Team(mongoose),
  Regional: Team(mongoose),
  Match: Team(mongoose)
});
