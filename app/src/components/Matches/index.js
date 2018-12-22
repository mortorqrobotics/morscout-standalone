import { connect } from "react-redux";
import loadMatches from "actions/Matches/index";
import Matches from "./Matches";

function mapStateToProps(state) {
  const { matches } = state;
  const ms = [];
  Object.entries(matches).forEach(([id, match]) => {
    if (match === undefined) {
      return;
    }
    ms.push({
      id,
      time: new Date(match.time),
      blue: match.teams.blue.map(team => team.num),
      red: match.teams.red.map(team => team.num),
      progress: match.progress,
    });
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
