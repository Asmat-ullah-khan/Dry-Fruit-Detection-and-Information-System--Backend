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

exports.loginUser = async (isEmail, passord) => {
  const user = await userRepoSitry.findUserByEmail();
};
