const catchAsync = require("../util/catch-async");
const User = require("../models/user.model");
const AppError = require("../util/app-errors");
// eslint-disable-next-line no-unused-vars
exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(201).json({
    status: "sucess",
    data: {
      user: users,
    },
  });
});
exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new AppError("No user found with this ID", 404));
  }
  res.status(200).json({
    status: "sucess",
    data: {
      user: user,
    },
  });
});
