const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const AppError = require("../util/app-errors");
const catchAsync = require("../util/catch-async");
const protect = catchAsync(async (req, res, next) => {
  // 1) getting the token and check if that is there
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  //2) checking if the token is valid or not
  //3) check if user is still exits
  //4)check if the user changed password after token was issued
});
module.exports = protect;
