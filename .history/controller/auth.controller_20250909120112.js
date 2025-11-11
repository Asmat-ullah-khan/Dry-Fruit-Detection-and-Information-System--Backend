const jwt = require("jsonwebtoken");
const AppError = require("../util/app-errors");
const User = require("../models/user.model");
const catchAsync = require("../util/catch-async");
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
exports.signup = catchAsync(async (req, res, next) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return next(new AppError("No request body provided", 400));
  }
  const {
    firstName,
    lastName,
    email,
    password,
    passwordConfirm,
    phoneNumber,
    role,
  } = req.body;
  const newUser = await User.create({
    firstName,
    lastName,
    email,
    password,
    passwordConfirm,
    phoneNumber,
    role,
  });

  //these fileds will be hidden when send the reponse to the user
  newUser.password = undefined;
  newUser._v = undefined;
  const token = signToken(newUser._id);
  const verifyToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
  console.log(verifyToken);
  res.status(201).json({
    status: "sucess",
    token,
    data: {
      user: newUser,
    },
  });
});
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError("please provide email and password", 400));
  }
  const user = await User.findOne({ email }).select("+");
  const token = "";
  res.status(200).json({
    status: "success",
    token,
  });
});
