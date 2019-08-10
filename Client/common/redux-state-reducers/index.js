import matches from "./Matches";
import match from "./Match";
import teams from "./Teams";
import user from "./Basic/user";
import reduceReducers from "reduce-reducers";

export default {
  matches: reduceReducers(matches, match),
  teams: reduceReducers(teams),
  user
};
