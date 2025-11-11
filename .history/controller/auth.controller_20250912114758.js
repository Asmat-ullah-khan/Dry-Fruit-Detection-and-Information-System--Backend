const jwt = require("jsonwebtoken");
const AppError = require("../util/app-errors");
const User = require("../models/user.model");
const catchAsync = require("../util/catch-async");
const sendeEmail = require(".././services/email");
const crypto = require("crypto");
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
    passwordChangedAt: new Date(req.body.passwordChangedAt),
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
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("invalid email or password", 401));
  }
  const token = signToken(user._id);
  res.status(200).json({
    status: "success",
    token,
  });
});

exports.forgotPassword = catchAsync(async (req, res, next) => {
  //1) get user based on post email

  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError("No user with that email!", 404));
  }
  //2)generate the random based token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  //3)send it to the user email
  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/users/resetPassword/${resetToken}`;
  const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.
If you didn't forget your password, please ignore this email.`;
  try {
    await sendeEmail({
      email: user.email,
      subject: "Your password reset token (valid for 10 min)",
      message,
    });
    res.status(200).json({
      status: "success",
      message: "token has send to the email",
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError(
        "There was an error sending the email. Try again later!",
        500
      )
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  //1) get the user based on the token
  const hashedToken = crypto.createHash("sha").update();

  //2)if token has no expired or there is user so set the new password
  //3)update the chnagedpassword property for the user
  //4)log the user in, and send jwt
});
