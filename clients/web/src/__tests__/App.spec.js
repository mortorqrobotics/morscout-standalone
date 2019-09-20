import React from "react";
import renderer from "react-test-renderer";

const Chance = require("chance");

let chances = {};

const mockMath = Object.create(Math);
mockMath.random = (seed = 42) => {
  chances[seed] = chances[seed] || new Chance(seed);
  const chance = chances[seed];
  return chance.random();
};

global.Math = mockMath;

test("app matches the snapshot", () => {
  document.body.innerHTML = '<div id="root"/>';
  const App = require("../App").default;
  chances = {};
  const component = renderer.create(<App />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
