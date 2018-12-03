import { connect } from "react-redux";
import loadMatches from "actions/Matches/index";
import Matches from "./Matches";

function mapStateToProps(state) {
  const { matches } = state;
  const ms = {};
  Object.entries(matches).forEach(([id, match]) => {
    if (match === undefined) {
      return;
    }
    ms[id] = {
      time: [
        new Date(match.time).getHours(),
        new Date(match.time).getMinutes(),
      ],
      blue: match.teams.blue,
      red: match.teams.red,
      progress: match.progress,
    };
  });
  return {
    matches: ms,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    load: () => dispatch(loadMatches()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Matches);
