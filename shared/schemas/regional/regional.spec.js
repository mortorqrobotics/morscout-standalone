import "mockingoose";
import mongoose from "mongoose";
import schema from ".";
import { pointSchema, polygonSchema } from "../util/geojson";

test("regional is a Schema", async () => {
  expect.assertions(1);
  expect(schema).toBeInstanceOf(mongoose.Schema);
});

test("regional does not throw on valid Regional", async () => {
  const Regional = mongoose.model("Regional", schema);
  const Point = mongoose.model("Point", pointSchema);
  const Polygon = mongoose.model("Polygon", polygonSchema);
  expect.assertions(1);
  const regional = {
    name: "LA Regional", // Generate a random ObjectID
    location: new Point({ coordinates: [0, 0] }), // Generate a random ObjectID
    district: new Polygon({
      coordinates: [
        [[100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0], [100.0, 0.0]]
      ]
    }),
    url: "https://twitch.com/123456789",
    startDate: new Date(0),
    endDate: new Date(1000),
    season: mongoose.Types.ObjectId(), // Generate a random ObjectID
    eventType: "regional",
    key: "abc123"
  };
  expect(new Regional(regional).validateSync()).toBeUndefined();
});
