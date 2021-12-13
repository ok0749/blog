const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const config = require("../config");

const bcryptSaultRounds = config.bcrypt.saltRounds;

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default:
      "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-photo-183042379.jpg",
  },
});

userSchema.pre("save", async function (next) {
  // if (!this.avatar)
  //   this.avatar =
  //     "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-photo-183042379.jpg";
  this.password = await bcrypt.hash(this.password, bcryptSaultRounds);
  next();
});

module.exports = mongoose.model("User", userSchema);
