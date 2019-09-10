import { Schema } from "mongoose";
import { isPosition } from "geojson-validation";
import { Point } from "geojson";

export default new Schema({
  type: {
    type: String,
    enum: ["Point"],
    required: true,
    default: "Point"
  },
  coordinates: {
    type: [Number],
    required: true,
    validate: isPosition
  }
});

export interface IPoint extends Document, Point {}
