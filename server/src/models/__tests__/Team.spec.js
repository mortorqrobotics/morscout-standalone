import "mockingoose";
import mongoose from "mongoose";
import schema from "../Team";

test("Model is same throughout", async () => {
  expect.assertions(2);
  expect(schema).toMatchSnapshot();
  expect(mongoose.model("Team", schema)).toMatchSnapshot();
});
