// __tests__/Message.spec.js
import React from "react";
import renderer from "react-test-renderer";
import Message from "../Messages";

// console.log(require("canvas"));

test("renders correctly", () => {
  const tree = renderer
    .create(React.createElement(Message, {}, ["Hello"]))
    .toJSON();
  expect(tree).toMatchSnapshot();
});
