import { connect } from "react-redux";
import loadMatch from "actions/Match";
import Match from "./Match";

export default function makeMatch(id) {
  function mapStateToProps(state) {
    if (state.match.id !== undefined) {
      return {
        match: state.match[id],
        id,
      };
    }
    if (state.matches.id !== undefined) {
      return {
        match: state.matches[id],
        id,
      };
    }
    return {
      match: {
        name: "data",
      },
      id,
    };
  }

  function mapDispatchToProps(dispatch) {
    return {
      load: i => dispatch(loadMatch(i)),
    };
  }

  return connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Match);
}
