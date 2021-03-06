import React from "react";
import Uranium from "uranium";
import { Text } from "react-native";
import PropTypes from "prop-types";

class Message extends React.Component {
  static propTypes = {
    isVisible: PropTypes.bool,
    onClick: PropTypes.func,
    children: PropTypes.node.isRequired
  };

  static defaultProp = {
    isVisible: true,
    onClick: () => {}
  };

  constructor(props) {
    super(props);
    // eslint-disable-next-line
    this.state = {
      message: props.children,
      isVisible: props.isVisible,
      onClick: props.onClick
    };
  }

  render() {
    const { state } = this;
    const style = state.isVisible ? ' style="display:none;"' : "";
    return (
      <Text {...style} onClick={state.onClick}>
        {state.message}
      </Text>
    );
  }
}
export default Uranium(Message);

class RandomMessageInt extends React.Component {
  constructor(p) {
    super(p);
    const { props } = this;
    const state = {
      message: 0,
      messages: [],
      activeMessage: {}
    };
    // eslint-disable-next-line
    state.messages = React.Children.toArray(props.children);
    state.message = Math.min(
      Math.floor(Math.random() * state.messages.length),
      4
    );
    state.activeMessage = state.messages[state.message];
    // eslint-disable-next-line
    this.state = state;
  }

  randomMessage() {
    const { state } = this;
    const newState = Object.assign({}, state);
    do {
      newState.message = Math.floor(Math.random() * newState.messages.length);
    } while (newState.message === state.message);
    newState.activeMessage = state.messages[state.message];
    this.setState(newState);
  }

  render() {
    const { state } = this;
    return (
      <Message onClick={() => this.randomMessage()} key={state.message}>
        {state.activeMessage}
      </Message>
    );
  }
}
export const RandomMessage = Uranium(RandomMessageInt);
