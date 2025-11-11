const product = require("../Modules/productModule");
const AppError = require("../util/apperrors");
const catchAsync = require("../util/catchAsync");
exports.createProduct = catchAsync(async (req, res, next) => {
  const product = await product.create(req.body);
});
