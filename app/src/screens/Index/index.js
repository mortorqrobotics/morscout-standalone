import React from "react";
import { View } from "react-native";
import Uranium from "uranium";
import style from "style";

import Message, { RandomMessage } from "~/Basic/Messages";
import H from "@/H";

export default
@Uranium
class Index extends React.Component {
  static navigationOptions = () => ({
    title: "MorScout",
    linkName: "MorScout Index",
  });

  static path = "";

  render() {
    return (
      <View css={style.Index.background}>
        <H style={style.Index.Title} level={1}>
          MorScout -- Index
        </H>
        <RandomMessage css={style.Index.Message}>
          <Message>Welcome to MorScout!</Message>
          <Message>OurScout is MorScout Than YourScout</Message>
          <Message>Made With Fifty Shades of Orange</Message>
          <Message>MorPower, MorTeamwork, MorIngenuity, MorScout</Message>
          <Message>LessWork, MorScout</Message>
        </RandomMessage>
      </View>
    );
  }
}
