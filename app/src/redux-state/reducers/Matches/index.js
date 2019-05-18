import { updated } from "shared/types/Matches";
import { recursive } from "merge";
import Match from "shared/schemas/Match";
import mongoose from "mongoose";

export default (state = {}, action) => {
  const matches = Object.assign({}, state);
  switch (action.type) {
    case updated:
      Object.entries(action.data).forEach(([id, match]) => {
        const doc = new mongoose.Document(recursive(matches[id], match), Match);
        console.log(doc);
        doc.validate(err => {
          if (!err) {
            matches[id] = doc;
          }
        });
        matches[id].time = new Date(match.time);
      });
      return matches;
    default:
      return state;
  }
};
