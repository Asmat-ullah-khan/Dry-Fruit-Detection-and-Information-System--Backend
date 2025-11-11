const product = require("../Modules/productModule");
const AppError = require("../util/app-errors");
const catchAsync = require("../util/catch-async");
// eslint-disable-next-line no-unused-vars
exports.createProduct = catchAsync(async (req, res, next) => {
  const product = await product.create(req.body);
  res.status(200).json({
    status: "sucess",
    data: {
      product,
    },
  });
});
// eslint-disable-next-line no-unused-vars
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
  const product = await product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!product) {
    return next(new AppError("No product found with that ID", 404));
  }
  res.status(200).json({
    status: "sucess",
    data: { product },
  });
});
exports.deleteProduct = catchAsync(async (req, res, next) => {
  const product = await product.findByIdAndDelete(req.params.id);
  if (!product) {
    return next(new AppError("No product found with that ID", 404));
  }
  res.status(200).json({
    status: "sucess",
    data: null,
  });
});
