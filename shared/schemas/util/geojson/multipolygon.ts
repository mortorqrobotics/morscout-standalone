import { Schema, Document } from "mongoose";
import { isMultiPolygonCoor } from "geojson-validation";
import { MultiPolygon } from "geojson";

export default new Schema({
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

export interface IMultiPolygon extends Document, MultiPolygon {}
