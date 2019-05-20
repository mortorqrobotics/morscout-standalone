import "mockingoose";
import mongoose from "mongoose";
import schema from "../Alliance";

test("Alliance is a Schema", async () => {
  expect.assertions(1);
  expect(schema).toBeInstanceOf(mongoose.Schema);
});
