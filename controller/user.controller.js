const catchAsync = require("../util/catch-async");
const userService = require("../services/user");
const AppError = require("../util/app-errors");

exports.getMe = catchAsync(async (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      user: {
        id: req.user._id,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        email: req.user.email,
        role: req.user.role,
        phoneNumber: req.user.phoneNumber,
        profileImage: req.user.profileImage,
      },
    },
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  //1) create an error if user want to post password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        "This route is not for password updates. Please use /updateMyPassword.",
        400
      )
    );
  }
  if (req.file) {
    req.body.profileImage = `${req.protocol}://${req.get(
      "host"
    )}/uploads/users/${req.file.filename}`;
  }
  //2) update the user documents

  const updatedUser = await userService.updateMe(req.user.id, req.body);
  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});
exports.deleteMe = catchAsync(async (req, res) => {
  await userService.deleteMe(req.user.id);
  res.status(204).json({
    status: "success",
    data: null,
  });
});
exports.getAllUsers = catchAsync(async (req, res) => {
  const isAdmin = req.user.role === "admin";
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const users = await userService.getAllUsers(page, limit, isAdmin);

  res.status(200).json({
    status: "success",
    page,
    limit,
    totalUsers: users.total,
    data: { users: users.data },
  });
});

exports.updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUser(req.params.id, req.body);

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});
exports.getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  res.status(200).json({
    status: "success",
    data: {
      user: user,
    },
  });
});
exports.deleteUser = catchAsync(async (req, res) => {
  const deletedUser = await userService.deleteUserByAdmin(req.params.id);

  res.status(200).json({
    status: "success",
    message: "User has been deactivated successfully.",
    data: {
      user: deletedUser,
    },
  });
});
