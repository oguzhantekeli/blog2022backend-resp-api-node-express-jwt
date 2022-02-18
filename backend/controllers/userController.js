const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

// desc add new user
// route post /api/users
// access  public
const addUser = asyncHandler(async (req, res) => {
  const user = await User.create({
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
  });
  res.status(200).json(user);
});
// desc update user
// route post /api/users/:id
// access  private
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(400);
    throw new Error("user not found");
  }
  //if user authenticated
  if (!req.body.userName || !req.body.email || !req.body.password) {
    res.status(400);
    throw new Error("user name, password or email missing.Please try again.");
  }
  const updatedUser = await User.findByIdAndUpdate({
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
    avatar: req.body.avatar,
    status: req.body.status,
    about: req.body.about,
  });
  res.status(200).json(updatedUser);
});
// desc delete user
// route post /api/users/:id
// access  private
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(400);
    throw new Error("user not found");
  }
  //if user authenticated
  const user = await User.findById(req.params.id);
  user.remove();
  res.status(200).json({ status: "deleted", message: "user account deleted" });
});

module.exports = { addUser, updateUser, deleteUser };
