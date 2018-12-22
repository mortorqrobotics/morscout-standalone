import { updated } from "shared/types/Teams";

export default (state = {}, action) => {
  const teams = Object.assign({}, state);
  switch (action.type) {
    case updated:
      Object.entries(action.data).forEach(([id, match]) => {
        teams[id] = match;
        teams[id].time = new Date(match.time);
      });
      return teams;
    default:
      return state;
  }
};
