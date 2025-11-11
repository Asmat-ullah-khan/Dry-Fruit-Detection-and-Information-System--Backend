const catchAsync = require("../util/catch-async");
const User = require("../Modules/userModule");
exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(201).json({
    status: "sucess",
    data: {
      user: users,
    },
  });
});
