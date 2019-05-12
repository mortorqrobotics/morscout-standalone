import "mockingoose";
import mongoose from "mongoose";
import schema from "../Match";

test("Model is same throughout", async () => {
  expect.assertions(2);
  expect(schema).toMatchSnapshot();
  expect(mongoose.model("Match", schema)).toMatchSnapshot();
});
