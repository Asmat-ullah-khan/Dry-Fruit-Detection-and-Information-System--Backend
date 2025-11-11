const User = require("../models/user.model");
exports.createUser = async (userData) => {
  await User.create(userData);
};
