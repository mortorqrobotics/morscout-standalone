import React from "react";
import { Provider } from "react-redux";
import Index from "screen/index";
import Matches from "screen/matches";
import Match from "screen/match";
import Teams from "screen/teams";
import { createNavigator, SwitchRouter } from "@react-navigation/core";
import { createBrowserApp } from "@react-navigation/web";
import Navigation from "@/navigation";
import store from "client-common-redux";

const App = createBrowserApp(
  createNavigator(
    Navigation,
    SwitchRouter({
      Index,
      Matches,
      Match,
      Teams
    }),
    {}
  )
);

export default () => (
  <Provider store={store}>
    <App />
  </Provider>
);
