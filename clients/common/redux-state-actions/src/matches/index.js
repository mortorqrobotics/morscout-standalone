import { loadAllMatches, loadMatch } from "shared/types/matches";

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
