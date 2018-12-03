import React from "react";
import { View } from "react-native";
import Uranium from "uranium";
import style from "style";
import Loadable from "react-loadable";
import Loader from "~/Basic/Loader";

const MatchContainer = Loadable({
  loader: () => import("~/Matches"),
  loading: Loader,
});

export default
@Uranium
class Matches extends React.Component {
  static navigationOptions = () => ({
    title: "MorScout Matches",
    linkName: "MorScout Matches",
  });

  static path = "Matches";

  render() {
    return (
      <View css={style.Basic.background}>
        <MatchContainer />
      </View>
    );
  }
}
