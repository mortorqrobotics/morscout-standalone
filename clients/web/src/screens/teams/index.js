import React from "react";
import { View } from "react-native";
import Uranium from "uranium";
import style from "style";
import Loadable from "react-loadable";
import Loader from "~/basic/Loader";

const MatchContainer = Loadable({
  loader: () => import("~/teams"),
  loading: Loader
});

export default
@Uranium
class Teams extends React.Component {
  static navigationOptions = () => ({
    title: "MorScout Teams",
    linkName: "MorScout Teams"
  });

  static path = "Teams";

  render() {
    return (
      <View css={style.Basic.background}>
        <MatchContainer />
      </View>
    );
  }
}
