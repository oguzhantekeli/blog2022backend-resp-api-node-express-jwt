const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //get token from header
      token = req.headers.authorization.split(" ")[1];

      //verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      //decoded içinden daha önce parametre olarak belirtilen id alınabilir

      //get user id from token
      req.user = await User.findById(decoded.id).select("-password");
      //gelen user data içinden password gerek olmadığı için -password kullandık
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("not authorized");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("no valid token");
  }
});

module.exports = { protect };
