import { User } from "models";
import { Schema } from "mongoose";

export default (id: Schema.Types.ObjectId) =>
  User.findById(id, "-password -parentEmail -mobileDeviceTokens");
