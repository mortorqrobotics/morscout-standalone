import React from "react";
import PropTypes from "prop-types";
import { View, Text } from "react-native";
import Uranium from "uranium";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignInAlt,
  faSignOutAlt,
  faUser,
  faCog
} from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { Link } from "./index";
import styleFunc from "./style";

@Uranium
class UserIcon extends React.Component {
  static propTypes = {
    user: PropTypes.shape({
      loggedIn: PropTypes.bool
    }),
    dispatch: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  render() {
    const { user, dispatch } = this.props;
    const { open } = this.state;
    const style = styleFunc(open);
    if (user && user.loggedIn) {
      return (
        <View>
          <Text
            onClick={e => {
              const newState = {
                ...this.state,
                open: !open
              };
              this.setState(newState);
              // stop the click from triggering a close of the navbar
              e.stopPropagation();
            }}
          >
            <FontAwesomeIcon icon={faUser} />
            {user.name}
          </Text>

          <div css={style.Top.User}>
            <View>
              <Text>
                <Link routeName="logout">
                  <FontAwesomeIcon icon={faCog} />
                  Settings
                </Link>
              </Text>
              <Text>
                <a
                  onClick={e => {
                    dispatch({
                      type: "logout"
                    });
                    const newState = {
                      ...this.state,
                      open: false
                    };
                    this.setState(newState);
                    e.stopPropagation();
                  }}
                  role="button"
                  tabIndex="0"
                >
                  Log Out
                  <FontAwesomeIcon icon={faSignOutAlt} />
                </a>
              </Text>
            </View>
          </div>
        </View>
      );
    }
    return (
      <a
        onClick={e => {
          dispatch({
            type: "login"
          });
          e.stopPropagation();
        }}
        role="button"
        tabIndex="-1"
      >
        Log In
        <FontAwesomeIcon icon={faSignInAlt} />
      </a>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    ...props,
    user: state.user || { loggedIn: false }
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserIcon);
