import "mockingoose";
import mongoose from "mongoose";
import schema from "../Alliance";

test("alliance is a Schema", async () => {
  expect.assertions(1);
  expect(schema).toBeInstanceOf(mongoose.Schema);
});
