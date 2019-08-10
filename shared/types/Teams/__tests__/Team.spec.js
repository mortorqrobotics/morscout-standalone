import { loadTeams, updated } from "../index";

test("load Team stays the same", () => {
  expect(loadTeams).toMatchSnapshot();
});

test("updated Team stays the same", () => {
  expect(updated).toMatchSnapshot();
});
