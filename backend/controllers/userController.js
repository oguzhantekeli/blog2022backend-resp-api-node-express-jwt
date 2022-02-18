const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// desc get user data
// route post /api/users/user
// access  private
const getUser = asyncHandler(async (req, res) => {
  //if authenticated

  const user = req.user;
  res.status(200).json(user);
});

// desc get user data
// route post /api/users/login
// access  private
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //if authenticated
  const user = await User.findOne({ email: email });
  if (user && bcrypt.compare(password, user.password)) {
    res.json({
      userName: user.userName,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
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
      userName: user.userName,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
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
  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body);
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
  user.remove();
  res.status(200).json({ status: "deleted", message: "user account deleted" });
});

const generateToken = (id) => {
  // burada yoken içerisie gömmek istediğimiz değerleri parametre olarak alırız(id,name,email...)
  // daha sonra middleware ile decode ederken bu parametreler karşılaştırılır.
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

module.exports = { loginUser, getUser, addUser, updateUser, deleteUser };
