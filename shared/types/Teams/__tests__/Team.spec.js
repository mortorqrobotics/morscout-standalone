import { loadTeams, updated } from "../index";

test("Load Team stays the same", () => {
  expect(loadTeams).toMatchSnapshot();
});

test("Updated Team stays the same", () => {
  expect(updated).toMatchSnapshot();
});
