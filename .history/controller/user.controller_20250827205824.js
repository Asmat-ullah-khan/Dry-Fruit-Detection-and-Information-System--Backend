const catchAsync = require("../util/catch-async");
const User = require("../models/user.model");
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
  if(!re)
  const user = await User.findById(req.params.id);
  res.status(200).json({
    status:'sucess',
    data:{
    user:user
    }
  })
});
