import React from "react";
import { View } from "react-native";
import Uranium from "uranium";

import Message, { RandomMessage } from "~/Basic/Messages";
import { Title } from "~/Basic/Headers";

export default
@Uranium
class Index extends React.Component {
  render() {
    return (
      <View>
        <Title>MorScout</Title>
        <RandomMessage>
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
