// __tests__/Loader.spec.js
import React from "react";
import renderer from "react-test-renderer";
import { Provider } from "react-redux";
import store from "store";
import Match from "../index";

test("Match renders Correctly", async () => {
  expect.assertions(1);
  const MatchComp = Match("1");
  const tree = renderer
    .create(
      <Provider store={store}>
        <MatchComp />
      </Provider>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
