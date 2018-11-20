import Team from "./Team";

export default ({ mongoose }) => ({
  Team: Team(mongoose),
});
