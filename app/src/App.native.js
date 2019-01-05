import React from "react";
// import { Provider } from "react-redux";
// import Index from "screen/Index";
// import Matches from "screen/Matches";
// import Match from "screen/Match";
// import Settings from "screen/Settings";
// import { View, Text } from "react-native";
// import {
//   createBottomTabNavigator,
//   createAppContainer,
// } from "@react-navigation/web";
import {
  createSwitchNavigator /* , TabRouter */,
} from "@react-navigation/core";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createBrowserApp } from "@react-navigation/native";
import H from "@/H";
// import Navigation from "~/TopNav";
// import store from "store";
// import initialize from "actions/Basic/init";

// const unsub = store.subscribe(() => store.getState());
// store.dispatch(initialize);
// unsub();

const App = createBrowserApp(
  createBottomTabNavigator(
    createSwitchNavigator({
      Matches: {
        screen: <H>Matches</H>,
        path: "Matches",
      },
      Index: {
        screen: () => <H>Hello</H>,
        path: "",
      },
    }),
  ),
);

export default () => (
  // <Provider store={store}>
  <App />
  // </Provider>
);
