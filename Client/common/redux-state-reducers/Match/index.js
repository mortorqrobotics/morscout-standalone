import { updated } from "Shared/types/Match";

export default (state = {}, action) => {
  const matches = Object.assign({}, state);
  switch (action.type) {
    case updated:
      // eslint-disable-next-line
      const { id } = action.data;
      matches[id] = action.data;
      if (matches[id].time) {
        matches[id].time = new Date(matches[id].time);
      }
      if (matches[id].id) {
        delete matches[id].id;
      }
      return matches[id];
    default:
      return state;
  }
};
