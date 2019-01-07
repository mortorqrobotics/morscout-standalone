import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import Uranium from "uranium";
import { withNavigation } from "@react-navigation/core";
import style from "style";
import Loadable from "react-loadable";
import Loader from "~/Basic/Loader";

export default
@withNavigation
@Uranium
class MatchScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func
    })
  };

  static navigationOptions = ({ navigation }) => ({
    title: `Morscout Match -- ${navigation.getParam("id")}`,
    linkName: `MorScout Match -- ${navigation.getParam("id")}`
  });

  static path = "Match/:id";

  render() {
    const { navigation } = this.props;
    return (
      <View css={style.Basic.background}>
        {React.createElement(
          Loadable({
            loader: () => import("~/Match/index.js"),
            loading: Loader,
            render(loaded) {
              const Match = loaded.default(navigation.getParam("id", "1001"));
              return <Match />;
            }
          })
        )}
      </View>
    );
  }
}
