import React from "react";
import Uranium from "uranium";
import { Text, View } from "react-native";
import PropTypes from "prop-types";
// import Calendar from '@/Calendar';

export default
@Uranium
class Match extends React.Component {
  static propTypes = {
    match: PropTypes.shape({
      id: PropTypes.number,
    }).isRequired,
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    load: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = props.match === undefined ? props.match : {};
    props.load(props.id);
  }

  shouldComponentUpdate() {
    return true;
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return Object.assign({}, prevState, nextProps.match);
  }

  render() {
    return (
      <View>
        <Text>{JSON.stringify(this.state)}</Text>
        {/* <Text>{JSON.stringify(this.props)}</Text> */}
      </View>
    );
  }
}
