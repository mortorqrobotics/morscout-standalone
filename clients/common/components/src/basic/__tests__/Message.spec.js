// __tests__/Message.spec.js
import React from "react";
import renderer from "react-test-renderer";
import Message, { RandomMessage } from "../Messages";

// console.log(require("canvas"));

test("message renders correctly", async () => {
  expect.assertions(1);
  const tree = renderer
    .create(React.createElement(Message, {}, ["Hello"]))
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test("random Message renders correctly", async () => {
  expect.assertions(1);
  const tree = renderer
    .create(React.createElement(RandomMessage, {}, ["Hello"]))
    .toJSON();
  expect(tree).toMatchSnapshot();
});
