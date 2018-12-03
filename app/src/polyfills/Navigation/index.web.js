import React from "react";
import PropTypes from "prop-types";
import Uranium from "uranium";
import { Button, View, Text, Linking } from "react-native";
import { Link } from "@react-navigation/web";
import { SceneView } from "@react-navigation/core";
import style from "style";

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
            key: PropTypes.string,
          }),
        ),
      }),
    }),
  };

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  render() {
    const { descriptors, navigation } = this.props;
    const { visible } = this.state;
    const activeKey = navigation.state.routes[navigation.state.index].key;
    const descriptor = descriptors[activeKey];
    return (
      <View>
        <View
          css={style.Navigation.Back}
          style={{
            visibility: visible ? "visible" : "hidden",
          }}
          onClick={() => {
            const newState = Object.assign({}, this.state, {
              visible: false,
            });
            this.setState(newState);
          }}
        >
          <View css={style.Navigation.Top.Left}>
            <Link routeName="Index" css={style.Navigation.Top.Link}>
              MorScout
            </Link>
            <Link routeName="Matches" css={style.Navigation.Top.Link}>
              All Matches
            </Link>
            <Link routeName="TeamList" css={style.Navigation.Top.Link}>
              Team List
            </Link>
          </View>
          <View css={style.Navigation.Top.Right}>
            <Text
              css={style.Navigation.Top.Link}
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
            <Link routeName="Profile" css={style.Navigation.Top.Link}>
              Profile
            </Link>
            <Link routeName="logout" css={style.Navigation.Top.Link}>
              Log Out
            </Link>
          </View>
        </View>
        <Button
          onPress={e => {
            e.preventDefault();
            const { visible: isVisible } = this.state;
            const newState = Object.assign({}, this.state, {
              visible: !isVisible,
            });
            this.setState(newState);
          }}
          title="Show/hide"
        />
        <View
          onClick={() => {
            const newState = Object.assign({}, this.state, {
              visible: false,
            });
            this.setState(newState);
          }}
          style={{
            height: 1,
          }}
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
