const catchAsync = require("../util/catch-async");
const User = require("../models/user.model");
const AppError = require("../util/app-errors");
// eslint-disable-next-line no-unused-vars

exports.updateMe = catchAsync(async (req, res, next) => {
  //1) create an error if user want to post password data
  if (req.body.password || req.body.asswordConfirm) {
    return next(
      new AppError(
        "This route is not for password updates. Please use /updateMyPassword.",
        400
      )
    );
  }
  //2) update the user documents
  const filterobje
  const user
});
exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  if(!users){
    return next(new AppError('no users found ',404));
  }
  res.status(200).json({
    status: "success",
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
    status: "success",
    data: {
      user: user,
    },
  });
});
