import { updated } from "shared/types/Match";

global.matches = global.matches ? global.matches : {};
global.teams = global.teams ? global.teams : {};

export default (state = global.matches, action) => {
  const match = {};
  switch (action.type) {
    case updated:
      // eslint-disable-next-line
      const {
        id,
      } = action.data;
      match[id] = action.data;
      match[id].teams.blue.map(team => {
        global.teams[team.num] = team;
        return team;
      });
      match[id].time = new Date(match[id].time);
      delete match[action.data.id].id;
      global.matches = Object.assign({}, global.matches, match);
      return global.matches[id];
    default:
      return state;
  }
};
