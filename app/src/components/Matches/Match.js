import React from "react";
import PropTypes from "prop-types";
import { View, Text } from "react-native";
import Uranium from "uranium";

export default
@Uranium
class Match extends React.Component {
  static propTypes = {
    match: PropTypes.shape({
      id: PropTypes.string.isRequired,
      time: PropTypes.instanceOf(Date).isRequired,
      progress: PropTypes.shape({
        max: PropTypes.number.isRequired,
        current: PropTypes.number.isRequired
      }).isRequired,
      red: PropTypes.arrayOf(PropTypes.number).isRequired,
      blue: PropTypes.arrayOf(PropTypes.number).isRequired
    }).isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      open: true
    };
  }

  render() {
    const { open } = this.state;
    const { match } = this.props;
    return open ? (
      <View>
        <Text>{JSON.stringify(match)}</Text>
        <Text>
          {match.time.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
          })}
        </Text>
      </View>
    ) : null;
  }
}
