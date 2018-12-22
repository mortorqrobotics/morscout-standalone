import { updated } from "shared/types/Matches";

export default (state = {}, action) => {
  const matches = Object.assign({}, state);
  switch (action.type) {
    case updated:
      Object.entries(action.data).forEach(([id, match]) => {
        matches[id] = match;
        matches[id].time = new Date(match.time);
      });
      return matches;
    default:
      return state;
  }
};
