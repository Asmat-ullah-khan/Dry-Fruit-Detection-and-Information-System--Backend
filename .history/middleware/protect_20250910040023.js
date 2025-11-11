const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const AppError = require("../util/app-errors");
const catchAsync = require("../util/catch-async");
exports.protect = catchAsync(async (req, res, next) => {
  // 1) getting the token and check if that is there
});
