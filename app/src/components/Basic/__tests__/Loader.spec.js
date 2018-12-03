// __tests__/Loader.spec.js
import React from "react";
import renderer from "react-test-renderer";
import Loader from "../Loader";

test("Loader renders correctly", async () => {
  expect.assertions(1);
  const tree = renderer.create(React.createElement(Loader, {}, [])).toJSON();
  expect(tree).toMatchSnapshot();
});
