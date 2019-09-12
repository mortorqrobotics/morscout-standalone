import * as models from "../models";

test("models stay the same", () => {
  expect(models).toMatchSnapshot();
});
