import { loadMatch, updated } from "../index";

test("Load Match stays the same", () => {
  expect(loadMatch).toMatchSnapshot();
});

test("Updated Match stays the same", () => {
  expect(updated).toMatchSnapshot();
});
