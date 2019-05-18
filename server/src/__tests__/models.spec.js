import "mockingoose";
import * as models from "../models";

test("Models stay the same", () => {
  expect(models).toMatchSnapshot();
});
