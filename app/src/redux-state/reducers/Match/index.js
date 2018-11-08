import {
  updated,
} from 'shared/types/Match';

export default (state = global.matches, action) => {
  const match = {};
  const s = Object.assign({}, state);
  switch (action.type) {
    case updated:
      // eslint-disable-next-line
      const {
        id,
      } = action.data;
      match[id] = action.data;
      match[id].teams.blue.map((team) => {
        global.teams[team.num] = team;
        return team;
      });
      match[id].time = new Date(match[id].time);
      delete match[action.data.id].id;
      global.matches = Object.assign({}, s, match);
      return s;
    default:
      return state;
  }
};
