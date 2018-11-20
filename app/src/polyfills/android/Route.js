import React from "react";
import Loadable from "react-loadable";
import Loading from "./H";

const LoadableComponent = Loadable({
  loader: () => import("./Navigation"),
  loading: Loading,
});

export default () => <LoadableComponent />;
