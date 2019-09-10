import * as mongoose from "mongoose";
import { compare, hash, genSalt } from "bcryptjs";
import IUser from "./interface";

let SALT_WORK_FACTOR = 10;

var userSchema = new mongoose.Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  parentEmail: String,
  phone: {
    type: String, // changed from Number
    required: true,
    unique: true
  },
  profpicpath: String,
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team"
  },
  position: {
    type: String,
    enum: ["member", "leader", "mentor", "alumnus"]
  },
  scoutCaptain: {
    type: Boolean,
    default: false
  },
  mobileDeviceTokens: {
    type: [
      {
        type: String,
        required: true
      }
    ],
    default: []
  }
});

userSchema.pre<IUser>("save", function(next) {
  let capitalize = str => str[0].toUpperCase() + str.slice(1).toLowerCase();
  this.firstname = capitalize(this.firstname);
  this.lastname = capitalize(this.lastname);
  next();
});

userSchema.pre<IUser>("save", function(next) {
  let user = this;

  // if (!user.isModified("password")) return next(); Doesn't work

  genSalt(SALT_WORK_FACTOR, function(err: Error, salt: string) {
    hash(user.password, salt, function(err, hash) {
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword) {
  let password = this.password;
  return new Promise((resolve, reject) =>
    compare(candidatePassword, password, function(err, isMatch) {
      if (err) {
        reject(err);
      } else {
        resolve(!!isMatch);
      }
    })
  );
};

export default userSchema;
