import React from "react";
import { render } from "react-dom";
import mediaMock from "uranium/matchMediaMock";

global.matchMedia = mediaMock;
// eslint-disable-next-line import/first
import App from "./App";

render(<App />, document.getElementById("root"));
