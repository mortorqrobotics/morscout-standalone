import { loadAllMatches, loadMatch } from "Shared/types/Matches";

export function getMatches() {
  return {
    type: loadAllMatches,
    data: "LOAD_ALL_MATCHES"
  };
}

export function getMatch(id) {
  return {
    type: loadMatch,
    data: {
      id
    }
  };
}
