// __tests__/Message.spec.js
import React from "react";
import renderer from "react-test-renderer";
import Message from "../Messages";

// Note: test renderer must be required after react-native.

test("renders correctly", () => {
  const tree = renderer
    .create(React.createElement(Message, {}, ["Hello"]))
    .toJSON();
  expect(tree).toMatchSnapshot();
});
