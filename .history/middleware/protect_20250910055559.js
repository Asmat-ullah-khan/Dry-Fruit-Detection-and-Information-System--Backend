const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const AppError = require("../util/app-errors");
const catchAsync = require("../util/catch-async");
const protect = catchAsync(async (req, res, next) => {
  let token;
  // 1) getting the token and check if that is there
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  console.log("the token is :" + token);
  if (!token) {
    return next(new AppError("You are not logged in! Please log in.", 401));
  }
  //2) checking if the token is valid or not
  jwt.verify(token, process);
  //3) check if user is still exits
  //4)check if the user changed password after token was issued
  next();
});
module.exports = protect;
