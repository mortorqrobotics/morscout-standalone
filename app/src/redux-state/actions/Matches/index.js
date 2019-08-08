import { loadAllMatches } from "Shared/types/Matches";

export default () => ({
  type: loadAllMatches,
  data: "LOAD_ALL_MATCHES"
});
