import React from "react";
import Uranium from "uranium";
import { View, Text, Linking } from "react-native";
import { Link } from "@/react-router";
import style from "style";

export default
@Uranium
class TopNav extends React.PureComponent {
  render() {
    return (
      <View css={style.Navigation.Back}>
        <View css={style.Navigation.Top.Left}>
          <Link to="/" css={style.Navigation.Top.Link}>
            MorScout
          </Link>
          <Link to="/Matches" css={style.Navigation.Top.Link}>
            All Matches
          </Link>
          <Link to="/TeamList" css={style.Navigation.Top.Link}>
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
          <Link to="/Profile" css={style.Navigation.Top.Link}>
            Profile
          </Link>
          <Link to="/logout" css={style.Navigation.Top.Link}>
            Log Out
          </Link>
        </View>
      </View>
    );
  }
}
