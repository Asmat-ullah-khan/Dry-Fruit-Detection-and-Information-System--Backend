const catchAsync = require("../util/catchAsync");
const User = require("../Modules/userModule");
exports.getAllUsers = catchAsync(sync());
