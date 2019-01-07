import React from "react";
import PropTypes from "prop-types";
import Uranium from "uranium";
import { View, Text, Linking } from "react-native";
import { Link } from "@react-navigation/web";
import { SceneView } from "@react-navigation/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faBars } from "@fortawesome/free-solid-svg-icons";
import styleFunc from "./style";
import UserIcon from "./userIcon";

export { Link } from "@react-navigation/web";

export default
@Uranium
class Navigator extends React.PureComponent {
  static propTypes = {
    descriptors: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    navigation: PropTypes.shape({
      state: PropTypes.shape({
        routes: PropTypes.arrayOf(
          PropTypes.shape({
            key: PropTypes.string
          })
        )
      })
    }),
    user: PropTypes.shape({
      loggedIn: PropTypes.bool
    })
  };

  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  render() {
    const { descriptors, navigation } = this.props;
    const { visible } = this.state;
    const activeKey = navigation.state.routes[navigation.state.index].key;
    const descriptor = descriptors[activeKey];
    const style = styleFunc(visible);
    return (
      <View css={style.Container}>
        <View
          css={style.Nav}
          onClick={() => {
            const newState = Object.assign({}, this.state, {
              visible: false
            });
            this.setState(newState);
          }}
        >
          <View css={style.Top.Left}>
            <Link routeName="Index" css={style.Top.Link}>
              <FontAwesomeIcon icon={faHome} />
            </Link>
            <Link routeName="Matches" css={style.Top.Link}>
              All&nbsp;Matches
            </Link>
            <Link routeName="Teams" css={style.Top.Link}>
              Team&nbsp;List
            </Link>
          </View>
          <View css={style.Top.Right}>
            <Text
              css={style.Top.Link}
              onClick={() => {
                if (Linking.canOpenURL("morteam://") && window === undefined) {
                  Linking.openURL("morteam://");
                } else {
                  Linking.openURL("https://www.morteam.com/");
                }
              }}
            >
              MorTeam
            </Text>
            <UserIcon />
          </View>
        </View>
        <button
          onClick={e => {
            const { visible: isVisible } = this.state;
            const newState = Object.assign({}, this.state, {
              visible: !isVisible,
              open: false
            });
            this.setState(newState);
            e.preventDefault();
          }}
          type="button"
          css={style.Button}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
        <View
          onClick={() => {
            const newState = Object.assign({}, this.state, {
              visible: false
            });
            this.setState(newState);
          }}
          css={style.App}
        >
          <SceneView
            component={descriptor.getComponent()}
            navigation={descriptor.navigation}
          />
        </View>
      </View>
    );
  }
}
