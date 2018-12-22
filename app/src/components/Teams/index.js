import { connect } from "react-redux";
import loadTeams from "actions/Teams/index";
import Teams from "./Teams";

function mapStateToProps(state) {
  const { teams } = state;
  const tms = {};
  Object.entries(teams || {}).forEach(([id, match]) => {
    if (match === undefined) {
      return;
    }
    tms[id] = {
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
    teams: tms,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    load: () => dispatch(loadTeams()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Teams);
