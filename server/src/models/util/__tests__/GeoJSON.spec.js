import "mockingoose";
import mongoose from "mongoose";
import {
  pointSchema,
  multiPointSchema,
  lineSchema,
  multiLineSchema,
  polygonSchema,
  multiPolygonSchema
} from "../GeoJSON";

test("Point works", async () => {
  expect.assertions(2);
  expect(pointSchema).toMatchSnapshot();
  expect(mongoose.model("Point", pointSchema)).toMatchSnapshot();
});
