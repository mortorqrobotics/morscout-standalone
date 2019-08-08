import { loadTeams } from "Shared/types/Teams";

export default id => ({
  type: loadTeams,
  data: {
    id
  }
});
