import * as mongoose from "mongoose";
import * as bcrypt from "bcryptjs";
let SALT_WORK_FACTOR = 10;

var userSchema = new mongoose.Schema({
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

userSchema.pre("save", function(next) {
  let capitalize = str => str[0].toUpperCase() + str.slice(1).toLowerCase();
  this.firstname = capitalize(this.firstname);
  this.lastname = capitalize(this.lastname);
  next();
});

userSchema.pre("save", function(next) {
  let user = this;

  if (!user.isModified("password")) return next();

  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = async candidatePassword => {
  let password = this.password;
  bcrypt.compare(candidatePassword, password, function(err, isMatch) {
    if (err) {
      throw err;
    } else {
      return isMatch;
    }
  });
};

export default userSchema;
