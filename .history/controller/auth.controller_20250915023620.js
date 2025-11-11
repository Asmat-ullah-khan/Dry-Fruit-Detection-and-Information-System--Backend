const AppError = require("../util/app-errors");
const catchAsync = require("../util/catch-async");
const authService = require("../services/auth");

const createSendToken = (user, statusCode, res) => {
  const token = authService.generateToken(user._id);
  res.status(statusCode).json({
    status: "sucess",
    token,
    data: {
      user,
    },
  });
};
exports.signup = catchAsync(async (req, res, next) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return next(new AppError("No request body provided", 400));
  }

  const newUser = authService.signupUser(req.body);

  //these fileds will be hidden when send the reponse to the user
  newUser.password = undefined;
  newUser._v = undefined;
  createSendToken(newUser, 201, res);
});
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError("please provide email and password", 400));
  }
  const user = await authService.loginUser(email, password);
  createSendToken(user, 200, res);
});

exports.forgotPassword = catchAsync(async (req, res, next) => {
  await authService.forgotPassword(req.body.email, req);
  res.status(200).json({
    status: "success",
    message: "Token has been sent to the email",
  });
});
exports.resetPassword = catchAsync(async (req, res, next) => {
  const user = await authService.resetPassword(
    req.params.token,
    req.body.password,
    req.body.passwordConfirm
  );
  createSendToken(user, 200, res);
});
exports.updateMyPassword = catchAsync(async (req, res, next) => {
  //1)get the user from cllection
  const user = await User.findById(req.user.id).select("+password");
  //2)check if posted current password is correct
  if (!(await user.correctPassword(req.body.currentPassword, user.password))) {
    return next(new AppError("Your current password is wrong.", 401));
  }
  //3) if so,update the password
  (user.password = req.body.password),
    (user.passwordConfirm = req.body.passwordConfirm);
  await user.save();

  //4) log user in and send jwt
  createSendToken(user, 200, res);
});
