import React from "react";
import { Provider } from "react-redux";
import Index from "screen/Index";
import Matches from "screen/Matches";
import Match from "screen/Match";
import Teams from "screen/Teams";
import Settings from "screen/Settings";
import { createNavigator, SwitchRouter } from "@react-navigation/core";
import { createBrowserApp } from "@react-navigation/web";
import Navigation from "@/Navigation";
import store from "store";

const App = createBrowserApp(
  createNavigator(
    Navigation,
    SwitchRouter({
      Index,
      Matches,
      Match,
      Settings,
      Teams,
    }),
    {},
  ),
);

export default () => (
  <Provider store={store}>
    <App />
  </Provider>
);
