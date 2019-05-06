import { updated } from "shared/types/Matches";
import { recursive } from "merge";

export default (state = {}, action) => {
  const matches = Object.assign({}, state);
  switch (action.type) {
    case updated:
      Object.entries(action.data).forEach(([id, match]) => {
        matches[id] = recursive(matches[id], match);
        matches[id].time = new Date(match.time);
      });
      return matches;
    default:
      return state;
  }
};
