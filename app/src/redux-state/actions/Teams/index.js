import { loadTeams } from "shared/types/Teams";

export default id => ({
  type: loadTeams,
  data: {
    id,
  },
});
