import { loadTeams } from "shared/types/teams";

export default id => ({
  type: loadTeams,
  data: {
    id
  }
});
