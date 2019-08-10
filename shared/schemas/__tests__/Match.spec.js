import "mockingoose";
import mongoose from "mongoose";
import schema from "../Match";

test("match is a Schema", async () => {
  expect.assertions(1);
  expect(schema).toBeInstanceOf(mongoose.Schema);
});

test("match does not throw on valid match", async () => {
  expect.assertions(1);
  const Match = mongoose.model("Match", schema);
  const match = {
    redAlliance: mongoose.Types.ObjectId(), // Generate a random ObjectID
    blueAlliance: mongoose.Types.ObjectId(), // Generate a random ObjectID
    winner: "Blue",
    startDate: new Date(0),
    endDate: new Date(1000),
    Regional: mongoose.Types.ObjectId() // Generate a random ObjectID
  };
  expect(new Match(match).validateSync()).toBeUndefined();
});
