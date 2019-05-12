import "mockingoose";
import mongoose from "mongoose";
import schema from "../Alliance";

test("Model is same throughout", async () => {
  expect.assertions(2);
  expect(schema).toMatchSnapshot();
  expect(mongoose.model("Alliance", schema)).toMatchSnapshot();
});
