import React from "react";
import Uranium from "uranium";
import { Text } from "react-native";
import PropTypes from "prop-types";

export default
@Uranium
class Message extends React.Component {
  static propTypes = {
    isVisible: PropTypes.bool,
    onClick: PropTypes.func,
    children: PropTypes.node.isRequired,
  };

  static defaultProp = {
    isVisible: true,
    onClick: () => {},
  };

  constructor(props) {
    super(props);
    // eslint-disable-next-line
    this.state = {
      message: props.children,
      isVisible: props.isVisible,
      onClick: props.onClick,
    };
  }

  render() {
    const { state } = this;
    const style = state.isVisible ? ' style="display:none;"' : "";
    return (
      <Text {...style} onClick={state.onClick} className="Message">
        {state.message}
      </Text>
    );
  }
}

class RandomMessageInt extends React.Component {
  constructor(p) {
    super(p);
    const { props } = this;
    const state = {
      message: 0,
      messages: [],
      activeMessage: {},
    };
    // eslint-disable-next-line
    state.messages = React.Children.toArray(props.children);
    state.message = Math.min(
      Math.floor(0.5 * state.messages.length),
      state.messages.length - 1,
    );
    state.activeMessage = state.messages[state.message];
    // eslint-disable-next-line
    this.state = state;
  }

  randomMessage() {
    const { state, setState } = this;
    const newState = Object.assign({}, state);
    do {
      newState.message = Math.floor(0.5 * newState.messages.length);
    } while (newState.message === state.message);
    newState.activeMessage = state.messages[state.message];
    setState.bind(this)(newState);
  }

  render() {
    const { state } = this;
    return (
      <Message
        onClick={() => this.randomMessage()}
        className="RandomMessage"
        key={state.message}
      >
        {state.activeMessage}
      </Message>
    );
  }
}
export const RandomMessage = Uranium(RandomMessageInt);
