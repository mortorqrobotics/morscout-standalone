import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignInAlt,
  faSignOutAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { Link } from "./index.web";

class UserIcon extends React.Component {
  static propTypes = {
    user: PropTypes.shape({
      loggedIn: PropTypes.bool,
    }),
    dispatch: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  render() {
    const { user, dispatch } = this.props;
    const { open } = this.state;
    if (user && user.loggedIn) {
      return (
        <View>
          <View
            onClick={e => {
              const newState = {
                ...this.state,
                open: !open,
              };
              this.setState(newState);
              // stop the click from triggering a close of the navbar
              e.stopPropagation();
            }}
          >
            <FontAwesomeIcon icon={faUser} />
            {user.name}
          </View>
          <View
            style={{
              visibility: open ? "visible" : "hidden",
              height: open ? undefined : 0,
              width: open ? undefined : 0,
              overflow: "hidden",
            }}
          >
            <Link routeName="logout">
              Log Out
              <FontAwesomeIcon icon={faSignOutAlt} />
            </Link>
          </View>
        </View>
      );
    }
    return (
      <Link
        routeName="login"
        onClick={() =>
          dispatch({
            type: "login",
          })
        }
      >
        Log In
        <FontAwesomeIcon icon={faSignInAlt} />
      </Link>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    ...props,
    user: state.user || { loggedIn: false },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserIcon);
