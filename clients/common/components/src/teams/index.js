import { connect } from "react-redux";
import loadTeams from "redux-actions/src/teams";
import Teams from "./Teams";

function mapStateToProps(state) {
  const { teams } = state;
  return {
    teams
  };
}

function mapDispatchToProps(dispatch) {
  return {
    load: () => dispatch(loadTeams())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Teams);
