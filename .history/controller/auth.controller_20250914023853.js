/**
 * @description Handles user authentication operations including signup, login,
 * password reset, and password update.
 *
 * This controller validates input, interacts with models,
 * and structures responses.
 *
 * Author: Asmat Atal
 */

const jwt = require("jsonwebtoken");
const AppError = require("../util/app-errors");
const User = require("../models/user.model");
const catchAsync = require("../util/catch-async");
const sendeEmail = require("../services/email");
const crypto = require("crypto");

/**
 * Generates a JWT token for a given user ID.
 *
 * @param {string} id - User ID from MongoDB.
 * @returns {string} - Signed JWT token.
 */
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

/**
 * Sends a JSON response containing the JWT token and user data.
 *
 * @param {Object} user - User document from the database.
 * @param {number} statusCode - HTTP status code to return.
 * @param {Object} res - Express response object.
 * @returns {void}
 */
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

/**
 * Creates a new user and returns a JWT token.
 *
 * @param {Object} req - Express request object with user details.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {void}
 */
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

  newUser.password = undefined;
  newUser._v = undefined;

  createSendToken(newUser, 201, res);
});

/**
 * Logs in a user by validating credentials and returning a JWT token.
 *
 * @param {Object} req - Express request object with email and password.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {void}
 */
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Invalid email or password", 401));
  }

  createSendToken(user, 200, res);
});

/**
 * Generates a password reset token for the user and sends it via email.
 *
 * @param {Object} req - Express request object with user email.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {void}
 */
exports.forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new AppError("No user with that email!", 404));
  }

  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

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
      message: "Token has been sent to email",
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

/**
 * Resets a user's password using a valid reset token.
 *
 * @param {Object} req - Express request object containing token and new password.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {void}
 */
exports.resetPassword = catchAsync(async (req, res, next) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    return next(new AppError("Token is invalid or has expired", 400));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  createSendToken(user, 200, res);
});

/**
 * Updates the password for the currently logged-in user.
 *
 * @param {Object} req - Express request object with current and new passwords.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {void}
 */
exports.updateMyPassword = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  if (!(await user.correctPassword(req.body.currentPassword, user.password))) {
    return next(new AppError("Your current password is wrong.", 401));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  createSendToken(user, 200, res);
});
