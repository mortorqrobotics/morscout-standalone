import { loadMatch, updated } from "../index";

test("load Match stays the same", () => {
  expect(loadMatch).toMatchSnapshot();
});

test("updated Match stays the same", () => {
  expect(updated).toMatchSnapshot();
});
