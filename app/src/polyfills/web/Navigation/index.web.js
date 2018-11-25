import React from "react";
import PropTypes from "prop-types";
import Uranium from "uranium";
import { View, Text, Linking } from "react-native";
// import { Link } from "@react-navigation/web";
import { withNavigation } from "@react-navigation/core";
import style from "style";

const Link = ({ children, navigate, routeName }) => (
  <Text
    onClick={() => {
      console.log(routeName);
      navigate(routeName);
    }}
  >
    {children}
  </Text>
);
Link.propTypes = {
  navigate: PropTypes.func,
  children: PropTypes.node,
  routeName: PropTypes.string,
};

export default
@Uranium
@withNavigation
class Navigator extends React.PureComponent {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }),
  };

  render() {
    const { navigation } = this.props;
    const { navigate } = navigation;
    return (
      <View css={style.Navigation.Back}>
        <View css={style.Navigation.Top.Left}>
          <Link
            navigate={navigate}
            routeName="Index"
            css={style.Navigation.Top.Link}
          >
            MorScout
          </Link>
          <Link
            navigate={navigate}
            routeName="Matches"
            css={style.Navigation.Top.Link}
          >
            All Matches
          </Link>
          <Link
            navigate={navigate}
            routeName="TeamList"
            css={style.Navigation.Top.Link}
          >
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
          <Link
            navigate={navigate}
            routeName="Profile"
            css={style.Navigation.Top.Link}
          >
            Profile
          </Link>
          <Link
            navigate={navigate}
            routeName="logout"
            css={style.Navigation.Top.Link}
          >
            Log Out
          </Link>
        </View>
      </View>
    );
  }
}
