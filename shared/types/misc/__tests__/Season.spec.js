import { loadSeason, updatedSeason } from "../Season";

test("load Team stays the same", () => {
  expect(loadSeason).toMatchSnapshot();
});

test("updated Team stays the same", () => {
  expect(updatedSeason).toMatchSnapshot();
});
