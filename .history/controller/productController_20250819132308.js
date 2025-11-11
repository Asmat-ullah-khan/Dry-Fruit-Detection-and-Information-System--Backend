const product = require("../Modules/productModule");
const AppError = require("../util/apperrors");
const catchAsync = require("../util/catchAsync");
exports.createProduct = catchAsync(async (req, res, next) => {
  const product = await product.create(req.body);
  res.status(200).json({
    status: "sucess",
    data: {
      product,
    },
  });
});
exports.getAllProducts = catchAsync(async (req, res, next) => {
  const products = await product.find();
  res.status(200).json({
    status: "sucess",
    results: products.length,
    data: {
      products,
    },
  });
});
exports.getProduct = catchAsync(async (req, res, next) => {
  const product = await product.findById(req.params.id);
  if (!product) {
    return next(new AppError("No product found with that ID", 404));
  }
  res.status(200).json({
    status: "sucess",
    data: { product },
  });
});
exports.updateProduct = catchAsync(async (req, res, next) => {
  const product = await product.findByIdAndUpdate();
});
