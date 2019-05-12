import "mockingoose";
import mongoose from "mongoose";
import schema from "../Regional";

test("Model is same throughout", async () => {
  expect.assertions(2);
  expect(schema).toMatchSnapshot();
  expect(mongoose.model("Regional", schema)).toMatchSnapshot();
});
