import React from "react";
import Uranium from "uranium";
import PropType from "prop-types";

export default
@Uranium
class H extends React.Component {
  static propTypes = {
    level: PropType.number.isRequired,
    // childen: PropType.oneOfType([
    //   PropType.element,
    //   PropType.string,
    // ]).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      level: props.level,
    };
  }

  render() {
    const { props, state } = this;
    return React.createElement(`h${state.level}`, {}, props.children);
  }
}
