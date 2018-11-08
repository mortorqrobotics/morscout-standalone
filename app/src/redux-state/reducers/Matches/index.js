import {
  updated,
} from 'shared/types/Matches';

global.matches = global.matches ? global.matches : {};
global.teams = global.teams ? global.teams : {};
export default (state = global.matches, action) => {
  const matches = Object.assign({}, state, action.data);
  switch (action.type) {
    case updated:
      Object.entries(matches).forEach(([id, match]) => {
        if (match !== undefined) {
          matches[id].time = new Date(match.time);
          matches[id].teams.blue.map((team) => {
            global.teams[team.num] = team;
            return team;
          });
        }
      });
      global.matches = matches;
      return matches;
    default:
      return state;
  }
};
