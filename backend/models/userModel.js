const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: "default",
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    about: {
      type: String,
      default: "about me",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("User", userSchema, "users");
