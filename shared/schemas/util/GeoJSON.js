import { Schema } from "mongoose";
import {
  isMultiPointCoor,
  isLineStringCoor,
  isMultiLineStringCoor,
  isPolygonCoor,
  isMultiPolygonCoor
} from "geojson-validation";

export const pointSchema = new Schema({
  type: {
    type: String,
    enum: ["Point"],
    required: true,
    default: "Point"
  },
  coordinates: {
    type: [Number],
    required: true,
    validate: arr => arr.length === 2
  }
});
export default pointSchema;

export const multiPointSchema = new Schema({
  type: {
    type: String,
    enum: ["MultiPoint"],
    required: true,
    default: "MultiPoint"
  },
  coordinates: {
    type: [[Number]],
    validate: isMultiPointCoor,
    required: true
  }
});

export const lineSchema = new Schema({
  type: {
    type: String,
    enum: ["LineString"],
    required: true,
    default: "LineString"
  },
  coordinates: {
    type: [[Number]],
    validate: isLineStringCoor,
    required: true
  }
});

export const multiLineSchema = new Schema({
  type: {
    type: String,
    enum: ["MultiLineString"],
    required: true,
    default: "MultiLineString"
  },
  coordinates: {
    type: [[[Number]]],
    validate: isMultiLineStringCoor,
    required: true
  }
});

export const polygonSchema = new Schema({
  type: {
    type: String,
    enum: ["Polygon"],
    required: true,
    default: "Polygon"
  },
  coordinates: {
    type: [[[Number]]],
    validate: isPolygonCoor,
    required: true
  }
});

export const multiPolygonSchema = new Schema({
  type: {
    type: String,
    enum: ["MultiPolygon"],
    required: true,
    default: "MultiPolygon"
  },
  coordinates: {
    type: [[[[Number]]]],
    validate: isMultiPolygonCoor,
    required: true
  }
});
