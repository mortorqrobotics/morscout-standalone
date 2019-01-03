import "mockingoose";
import model from "../Team";

test("Model is same throughout", async () => {
  expect.assertions(1);
  expect(
    model({
      model: (name, obj) => obj,
    }),
  ).toMatchSnapshot();
});
