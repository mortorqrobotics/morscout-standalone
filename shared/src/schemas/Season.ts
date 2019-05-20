import * as mongoose from "mongoose";

const Season: mongoose.Schema = new mongoose.Schema({
  year: {
    type: Number,
    validate: year => year >= 1989 && year <= new Date().getUTCFullYear() + 1,
    default: () => new Date().getUTCFullYear(),
    required: true
  },
  name: {
    type: String,
    required: true
  },

  buildStart: {
    type: Date,
    required: true
  },
  buildEnd: {
    type: Date,
    required: true
  },
  seasonStart: {
    type: Date,
    required: true
  },
  seasonEnd: {
    type: Date,
    required: true
  }
});

export default Season;
