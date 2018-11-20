import { loadAllMatches } from "shared/types/Matches";

export default () => ({
  type: loadAllMatches,
  data: "LOAD_ALL_MATCHES",
});
