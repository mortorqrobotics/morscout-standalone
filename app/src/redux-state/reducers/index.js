import matches from "reducers/Matches";
import match from "reducers/Match";
import teams from "reducers/Teams";
import user from "reducers/Basic/user";
import reduceReducers from "reduce-reducers";

export default {
  matches: reduceReducers(matches, match),
  teams: reduceReducers(teams),
  user,
};
