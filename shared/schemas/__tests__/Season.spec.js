import "mockingoose";
import mongoose from "mongoose";
import schema from "../Season";

test("Season is a schema", async () => {
  expect.assertions(1);
  expect(schema).toBeInstanceOf(mongoose.Schema);
});

test("Season does not throw on valid season", async () => {
  expect.assertions(2);
  const Season = mongoose.model("Season", schema);
  const season1 = new Season({
    year: 2019,
    name: "Destination: Deep Space",
    buildStart: new Date("January 7, 2019 00:00:00 EST"),
    buildEnd: new Date("March 14, 2019 00:00:00 EST"),
    seasonStart: new Date("March 15, 2019 00:00:00 EST"),
    seasonEnd: new Date("March 31, 2019 00:00:00 EST")
  });
  expect(season1.validateSync()).toBeUndefined();
  const season2 = new Season({
    name: "Destination: Deep Space",
    buildStart: new Date(
      `January 7, ${new Date().getUTCFullYear()} 00:00:00 EST`
    ),
    buildEnd: new Date(`March 14, ${new Date().getUTCFullYear()} 00:00:00 EST`),
    seasonStart: new Date(
      `March 15, ${new Date().getUTCFullYear()} 00:00:00 EST`
    ),
    seasonEnd: new Date(`March 31, ${new Date().getUTCFullYear()} 00:00:00 EST`)
  });
  expect(season2.validateSync()).toBeUndefined();
});
