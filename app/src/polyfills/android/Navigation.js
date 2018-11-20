import React from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";
import Uranium from "uranium";
import style from "style";

function renderIndex() {
  return (
    <View css={style.Navigation.index}>
      <Text>INDEX</Text>
    </View>
  );
}

export default
@Uranium
class Navigation extends React.Component {
  static propTypes = {
    pages: PropTypes.objectOf(PropTypes.node),
    index: PropTypes.string,
    current: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      pages: Object.assign(
        {
          index: () => null,
          404: () => <Text>404: Page Not Found</Text>,
        },
        props.pages,
      ),
      index: props.index || "index",
      current: props.current || window.location.pathname || "index",
    };
    window.globals = {};
    const { pages } = this.state;
    window.globals.pages = pages;
    window.globals.react = React;
    window.globals.newPage = this.changePage;
  }

  getCurrentPage() {
    const { current, pages } = this.state;
    let ps = Object.assign({}, pages);
    const page = (current === "/" ? "/index" : current).toLocaleLowerCase();
    const site = current.split("/");
    page.split("/").forEach(elem => {
      if (elem !== "" && ps[elem] !== undefined) {
        ps = ps[elem];
        site.splice(0, 1);
        if (typeof page === "function") {
          return React.createElement(page, { path: site });
        }
      }
      return null;
    });
    return React.createElement(typeof ps === "function" ? ps : pages["404"]);
  }

  changePage(newPage) {
    return () => {
      const state = Object.assign({}, this.state);
      state.current = newPage;
      window.history.pushState({}, newPage, newPage);
      this.setState(state, () => {});
    };
  }

  render() {
    const { pages } = this.state;
    return (
      <View css={style.background}>
        <nav>
          <ul css={style.Navigation.NavList}>
            <NavItem
              onClick={this.changePage("index")}
              message={renderIndex()}
              css={style.Navigation.NavItem}
              key={0}
            />
            {Object.keys(pages).map((key, i) => {
              if (key === 404 || key === "index") {
                return null;
              }
              return (
                <NavItem
                  onClick={this.changePage(key)}
                  message={key}
                  css={style.Navigation.NavItem}
                  key={i + 1}
                />
              );
            })}
          </ul>
        </nav>
        {this.getCurrentPage()}
      </View>
    );
  }
}

export
@Uranium
class NavItem extends React.Component {
  static propTypes = {
    message: PropTypes.node,
    key: PropTypes.number,
    onClick: PropTypes.func,
  };

  constructor(props) {
    super(props);
    const { message, onClick, key } = props;
    this.state = {
      message: message || "",
      onClick: onClick || (() => null),
      key,
    };
  }

  render() {
    const { onClick, message, key } = this.state;
    return (
      <li
        key={key}
        onClick={onClick}
        role="link"
        tabIndex={0}
        onKeyPress={() => undefined}
      >
        {message}
      </li>
    );
  }
}
