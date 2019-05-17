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
  expect.assertions(3);
  expect(pointSchema).toMatchSnapshot();
  expect(pointSchema).toBeInstanceOf(mongoose.Schema);
  const Point = mongoose.model("Point", pointSchema);
  const point = new Point({
    type: "Point",
    coordinates: [0, 0]
  });
  expect(point.validateSync()).toBeUndefined();
});

test("MultiPoint works", async () => {
  expect.assertions(3);
  expect(multiPointSchema).toMatchSnapshot();
  expect(multiPointSchema).toBeInstanceOf(mongoose.Schema);
  const MultiPoint = mongoose.model("MultiPoint", multiPointSchema);
  const multiPoint = new MultiPoint({
    type: "MultiPoint",
    coordinates: [[0, 0]]
  });
  expect(multiPoint.validateSync()).toBeUndefined();
});

test("Line works", async () => {
  expect.assertions(3);
  expect(lineSchema).toMatchSnapshot();
  expect(lineSchema).toBeInstanceOf(mongoose.Schema);
  const Line = mongoose.model("Line", lineSchema);
  const line = new Line({
    type: "LineString",
    coordinates: [[0, 0]]
  });
  expect(line.validateSync()).toBeUndefined();
});

test("MultiLine works", async () => {
  expect.assertions(3);
  expect(multiLineSchema).toMatchSnapshot();
  expect(multiLineSchema).toBeInstanceOf(mongoose.Schema);
  const MultiLine = mongoose.model("MultiLine", multiLineSchema);
  const multiLine = new MultiLine({
    type: "MultiLineString",
    coordinates: [[[0, 0]]]
  });
  expect(multiLine.validateSync()).toBeUndefined();
});

test("Polygon works", async () => {
  expect.assertions(3);
  expect(polygonSchema).toMatchSnapshot();
  expect(polygonSchema).toBeInstanceOf(mongoose.Schema);
  const Polygon = mongoose.model("Polygon", polygonSchema);
  const polygon = new Polygon({
    type: "Polygon",
    coordinates: [
      [[100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0], [100.0, 0.0]]
    ]
  });
  expect(polygon.validateSync()).toBeUndefined();
});

test("MultiPolygon works", async () => {
  expect.assertions(3);
  expect(multiPolygonSchema).toMatchSnapshot();
  expect(multiPolygonSchema).toBeInstanceOf(mongoose.Schema);
  const MultiPolygon = mongoose.model("MultiPolygon", multiPolygonSchema);
  const multiPolygon = new MultiPolygon({
    type: "MultiPolygon",
    coordinates: [
      [[[100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0], [100.0, 0.0]]]
    ]
  });
  expect(multiPolygon.validateSync()).toBeUndefined();
});
