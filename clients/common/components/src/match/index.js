import { connect } from "react-redux";
import { getMatch } from "redux-actions/src/matches";
import Match from "./Match";

export default function makeMatch(id) {
  function mapStateToProps(state) {
    if (state.matches[id] !== undefined) {
      return {
        match: state.matches[id],
        id
      };
    }
    return {
      match: {
        name: "data"
      },
      id
    };
  }

  function mapDispatchToProps(dispatch) {
    return {
      load: i => dispatch(getMatch(i))
    };
  }

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(Match);
}
