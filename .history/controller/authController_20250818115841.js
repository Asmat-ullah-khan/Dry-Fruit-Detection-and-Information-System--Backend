const jwt = require("jsonwebtoken");
const AppError = require("../util/apperrors");
const user = require("../Modules/userModule");
const signToken = (id) => {
  return jwt.sign({ id });
};
