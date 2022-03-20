const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//
//todo update delete actions needs user authentication
//

// desc get user data
// route post /api/users/user/:id
// access  public
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.status(200).json({
      id: user._id,
      userName: user.userName,
      title: user.title,
      avatar: user.avatar,
      about: user.about,
      webSite: user.webSite,
      facebook: user.facebook,
      twitter: user.twitter,
      instagram: user.instagram,
    });
  } else {
    res
      .status(400)
      .json({ error: "User Not Found.", message: "User Not Found." });
    throw new Error("User Not Found.");
  }
});

// desc login user
// route post /api/users/login
// access  private
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //if authenticated
  const user = await User.findOne({ email: email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      id: user._id,
      userName: user.userName,
      email: user.email,
      title: user.title,
      avatar: user.avatar,
      about: user.about,
      webSite: user.webSite,
      facebook: user.facebook,
      twitter: user.twitter,
      instagram: user.instagram,
      status: user.status,
      createdAt: user.createdAt,
      token: generateToken(user._id),
    });
  } else {
    res
      .status(400)
      .json({ error: "Invalid credentials", message: "Invalid credentials" });
    throw new Error("Invalid credentials");
  }
});

// desc add new user
// route post /api/users
// access  public
const addUser = asyncHandler(async (req, res) => {
  const { userName, email, password } = req.body;
  if (!userName || !email || !password) {
    res.status(400);
    throw new Error("required fields must be filled");
  }
  const userExists = await User.findOne({ email: email });
  if (userExists) {
    res.status(400);
    throw new Error("user already exists");
  }
  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //create user
  const user = await User.create({
    userName: userName,
    email: email,
    password: hashedPassword,
  });
  if (user) {
    res.status(201).json({
      id: user._id,
      userName: user.userName,
      email: user.email,
      title: user.title,
      avatar: user.avatar,
      about: user.about,
      status: user.status,
      webSite: user.webSite,
      facebook: user.facebook,
      twitter: user.twitter,
      instagram: user.instagram,
      createdAt: user.createdAt,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// desc update user
// route put /api/users/:id
// access  private
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(400);
    throw new Error("user not found");
  }
  //if user authenticated

  if (req.user.id.toString() !== req.params.id) {
    res.status(401);
    throw new Error("User not authorized.");
  }
  if (!req.body.userName) {
    res.status(400);
    throw new Error("user name not provided.Please try again.");
  }
  await User.findByIdAndUpdate(req.params.id, req.body);
  const updatedUser = await User.findById(req.params.id);
  if (!updatedUser) {
    res.status(400);
    throw new Error("update fail");
  }

  res.status(200).json({
    id: updatedUser._id,
    userName: updatedUser.userName,
    email: updatedUser.email,
    title: updatedUser.title,
    avatar: updatedUser.avatar,
    about: updatedUser.about,
    status: updatedUser.status,
    webSite: updatedUser.webSite,
    facebook: updatedUser.facebook,
    twitter: updatedUser.twitter,
    instagram: updatedUser.instagram,
    updatedAt: updatedUser.updatedAt,
    token: generateToken(updatedUser._id),
  });
});

// desc change user password
// route put /api/users/changepassword/:id
// access  private
const changePassword = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(400);
    throw new Error("user not found");
  }

  if (req.user.id.toString() !== req.params.id) {
    res.status(401);
    throw new Error("User not authorized.");
  }
  const { currentPassword, password } = req.body;
  if (user && (await bcrypt.compare(currentPassword, user.password))) {
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    await User.findByIdAndUpdate(req.params.id, { password: hashedPassword });
    res.status(200).json("Password Changed Successfully.");
  } else {
    res.status(401).json({
      message:
        "Invalid credentials to change password. Check current password.",
    });
    throw new Error(
      "Invalid credentials to change password. Check current password."
    );
  }
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

  if (req.user.id.toString() !== req.params.id) {
    res.status(401);
    throw new Error("User not authorized.");
  }
  //if user authenticated
  user.remove();
  res.status(200).json({ status: "deleted", message: "user account deleted" });
});

const generateToken = (id) => {
  // burada token içerisie gömmek istediğimiz değerleri parametre olarak alırız(id,name,email...)
  // daha sonra middleware ile decode ederken bu parametreler karşılaştırılır.
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

module.exports = {
  loginUser,
  getUser,
  addUser,
  updateUser,
  changePassword,
  deleteUser,
};
