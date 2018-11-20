import React from "react";
import Uranium from "uranium";
import H from "@/H";

export default
@Uranium
class Header extends React.Component {
  render() {
    const { props } = this;
    return (
      <H className="Header" level="2">
        {React.Children.map(props.children, child => child)}
      </H>
    );
  }
}
// eslint-disable-next-line
class TitleInt extends React.Component {
  constructor(props) {
    super(props);
    // eslint-disable-next-line
        this.state = document ? {
          title: document.getElementsByTagName("title"),
        }
      : {};
  }

  render() {
    const { props, state } = this;
    for (
      let i = 0;
      state.title !== undefined && i < state.title.length;
      i += 1
    ) {
      state.title[i].innerHTML = props.children;
    }
    return (
      <H className="Title" level={1}>
        {props.children}
      </H>
    );
  }
}
export const Title = Uranium(TitleInt);
