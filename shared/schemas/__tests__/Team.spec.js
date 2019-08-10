import "mockingoose";
import mongoose from "mongoose";
import geojson from "geojson";
import schema from "../Team";
import { pointSchema } from "../util/GeoJSON";

test("team is a schema", async () => {
  expect.assertions(1);
  expect(schema).toBeInstanceOf(mongoose.Schema);
});

test("team does not throw on valid team", async () => {
  expect.assertions(1);
  const Team = mongoose.model("Team", schema);
  const Point = mongoose.model("Point", pointSchema);
  const team = new Team({
    name: "MorTorq Robotics",
    number: 1515,
    registeredRegionals: [new mongoose.Types.ObjectId()],
    location: new Point({
      type: "Point",
      coordinates: [-118.411, 34.061]
    })
  });
  expect(team.validateSync()).toBeUndefined();
});
