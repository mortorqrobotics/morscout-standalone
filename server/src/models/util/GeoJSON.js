import { Schema } from "mongoose";

export const pointSchema = new Schema({
  type: {
    type: String,
    enum: ["Point"],
    required: true
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
    required: true
  },
  coordinates: {
    type: [
      {
        type: [Number],
        validate: arr => arr.length === 2
      }
    ],
    required: true
  }
});

export const lineSchema = new Schema({
  type: {
    type: String,
    enum: ["LineString"],
    required: true
  },
  coordinates: {
    type: [
      {
        type: [Number],
        validate: arr => arr.length === 2
      }
    ],
    required: true
  }
});

export const multiLineSchema = new Schema({
  type: {
    type: String,
    enum: ["MultiLineString"],
    required: true
  },
  coordinates: {
    type: [
      [
        {
          type: [Number],
          validate: arr => arr.length === 2
        }
      ]
    ],
    required: true
  }
});

export const polygonSchema = new Schema({
  type: {
    type: String,
    enum: ["Polygon"],
    required: true
  },
  coordinates: {
    type: [
      [
        {
          type: [Number],
          validate: arr => arr.length === 2
        }
      ]
    ],
    required: true
  }
});

export const multiPolygonSchema = new Schema({
  type: {
    type: String,
    enum: ["MultiPolygon"],
    required: true
  },
  coordinates: {
    type: [
      [
        [
          {
            type: [Number],
            validate: arr => arr.length === 2
          }
        ]
      ]
    ],
    required: true
  }
});
