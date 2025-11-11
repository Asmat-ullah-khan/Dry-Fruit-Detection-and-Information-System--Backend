const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const userRepoSitry = require("../repository/user");
const AppError = require("../util/app-errors");
const sendEmail = require("./email");
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
exports.generateToken = (userId) => {
  return signToken(userId);
};
exports.signupUser = async (userData) => {
  return await userRepoSitry.createUser(userData);
};

exports.loginUser = async (email, password) => {
  const user = await userRepoSitry.findUserByEmail(email);
  if (!user || (await user.correctPassword(password, user.password))) {
    throw new AppError("Invalid email or password", 401);
  }
};
exports.forgotPassword = async (email, req) => {
  const user = await userRepoSitry.findUserByEmail(email);
  if (!user) throw new AppError("No user with that email!", 404);
};
