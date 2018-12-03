// __tests__/index.spec.js
import { updated } from "shared/types/Matches";
import { parse as parse5 } from "json5";
import { readFile } from "fs-extra";
import { join } from "path";
import reducer from "../index";

test("reducer returns the global matches if there is no state", async () => {
  expect.assertions(1);
  global.matches = {};
  expect(reducer(undefined, {})).toBe(global.matches);
});

test("reducer must never mutate the state directly", async () => {
  expect.assertions(2);
  const matches = {};
  const a = Object.assign({}, matches);
  expect(reducer(matches, {})).toBe(matches);
  expect(global.matches).toEqual(a);
});

test("reducer returns the same as before (for compatibility)", async () => {
  const matches = {};
  const data = parse5(await readFile(join(__dirname, "index.data.json5")));
  expect.assertions(data.length);
  data.forEach(d => {
    const ret = reducer(matches, { type: updated, data: d });
    expect(ret).toMatchSnapshot();
  });
});

test("reducer shouldn't override existing global variables", async () => {
  expect.assertions(2);
  global.matches = { Data: 1 };
  global.teams = { Data: 1 };
  const matches = Object.assign({}, global.matches);
  const teams = Object.assign({}, global.teams);
  // eslint-disable-next-line global-require
  require("../index");
  expect(matches).toEqual(global.matches);
  expect(teams).toEqual(global.teams);
});
