const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    name: { type: String, require: true, unique: true },
    email: { type: String, require: true },
    password: { type: String, require: true, select: false },
    profilePic: { type: String, require: true },
    userLoginSecretKey: { type: String, select: false },
  },
  { timestamps: true }
);

const User = mongoose.model("user", schema);

module.exports = User;
