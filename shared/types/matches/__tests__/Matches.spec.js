import { loadAllMatches, updated } from "../index";

test("load All Matches stays the same", () => {
  expect(loadAllMatches).toMatchSnapshot();
});

test("updated Matches stays the same", () => {
  expect(updated).toMatchSnapshot();
});
