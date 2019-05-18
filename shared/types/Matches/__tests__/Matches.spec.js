import { loadAllMatches, updated } from "../index";

test("Load All Matches stays the same", () => {
  expect(loadAllMatches).toMatchSnapshot();
});

test("Updated Matches stays the same", () => {
  expect(updated).toMatchSnapshot();
});
