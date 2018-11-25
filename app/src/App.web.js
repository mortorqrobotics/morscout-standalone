import React from "react";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import Index from "screen/Index";
import Matches from "screen/Matches";
// import Match from "screen/Match";
// import Settings from "screen/Settings";
import { View, Text } from "react-native";
// import {
//   createBottomTabNavigator,
//   createAppContainer,
// } from "@react-navigation/web";
import { createSwitchNavigator } from "@react-navigation/core";
import { createBrowserApp } from "@react-navigation/web";
import H from "@/H";
import Navigation from "@/Navigation";
import store from "store";
import initialize from "actions/Basic/init";

const unsub = store.subscribe(() => store.getState());
store.dispatch(initialize);
unsub();

// eslint-disable-next-line
function dataDumper(props){
  return <H level={6}>{JSON.stringify(props)}</H>;
}

// eslint-disable-next-line
class BackButton extends React.Component {
  static contextTypes = {
    // eslint-disable-next-line
    router: PropTypes.object,
  };

  render() {
    const { context } = this;
    return <Text onClick={context.router.history.goBack}>Back</Text>;
  }
}

// eslint-disable-next-line
function NotFoundError() {
  return (
    <View>
      <H level={1}>Page not found</H>
      <BackButton />
    </View>
  );
}

// eslint-disable-next-line
const App = createBrowserApp(
  createSwitchNavigator({
    Matches: {
      screen: () => (
        <>
          <Navigation />
          <Matches />
        </>
      ),
      path: "Matches",
    },
    Index: {
      screen: () => (
        <>
          <Navigation />
          <Index />
        </>
      ),
      path: "",
    },
  }),
);

export default () => (
  <Provider store={store}>
    <App />
  </Provider>
);
