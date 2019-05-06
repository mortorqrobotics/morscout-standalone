import * as mongoose from "mongoose";

const Season: mongoose.Schema = new mongoose.Schema({
  year: {
    type: Number,
    validate: year => year >= 1989 && year <= (new Date()).getUTCFullYear() + 1,
    default: () => (new Date()).getUTCFullYear()
  },
  name: String,
  buildStart: {
    type: Date,
    validate: date =>
      date.getUTCFullYear() === this.year ||
      date.getUTCFullYear() === this.year - 1
  },
  buildEnd: {
    type: Date,
    validate: date =>
      (date.getUTCFullYear() === this.year ||
        date.getUTCFullYear() === this.year - 1) &&
      date.time() > this.buildStart.time()
  },
  seasonStart: {
    type: Date,
    validate: date =>
      date.getUTCFullYear() === this.year && date.time() > this.buildEnd.time()
  },
  seasonEnd: {
    type: Date,
    validate: date => date.time() > this.seasonStart.time()
  }
});

export default mongoose.model("Season", Season);
