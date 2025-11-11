const jwt = require("jsonwebtoken");
const AppError = require("../util/apperrors");
const user = require("../Modules/userModule");
const catchAsync = require("../util/catchAsync");
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
exports.signup = catchAsync(async (req, res, next) => {
  const { firstName, lastName, email, password, passwordConfirm,phoneNumber,role } = req.body;
  if(!)
});
