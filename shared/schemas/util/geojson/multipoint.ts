import { Schema, Document } from "mongoose";
import { isMultiPointCoor } from "geojson-validation";
import { MultiPoint } from "geojson";

export default new Schema({
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

export interface IMultiPoint extends Document, MultiPoint {}
