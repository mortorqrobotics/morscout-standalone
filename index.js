/** @format */
/* eslint-disable import/first */

import { AppRegistry } from "react-native";

import matchMedia from "react-native-match-media";
// Only for native, will already be set on web
// eslint-disable-next-line
global.matchMedia = matchMedia;

import App from "./app/src/App";
import { name as appName } from "./app.json";

AppRegistry.registerComponent(appName, () => App);
