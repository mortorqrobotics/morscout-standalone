// __tests__/Loader.spec.js
import React from "react";
import renderer from "react-test-renderer";
import App from "../App.web";

jest.mock("~/Basic/Messages");

test("Match renders Correctly", async () => {
  expect.assertions(1);
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});
