const product = require("../models/product.model");
const AppError = require("../util/app-errors");
const catchAsync = require("../util/catch-async");

/**
 * Create a new product
 * @route POST /api/v1/products
 * @access Public (can adjust later if you add auth)
 */
// eslint-disable-next-line no-unused-vars
exports.createProduct = catchAsync(async (req, res, next) => {
  const newProduct = await product.create(req.body);
  res.status(200).json({
    status: "success",
    data: {
      product: newProduct,
    },
  });
});

/**
 * Get all products
 * @route GET /api/v1/products
 * @access Public
 */
// eslint-disable-next-line no-unused-vars
exports.getAllProducts = catchAsync(async (req, res, next) => {
  const products = await product.find();
  res.status(200).json({
    status: "success",
    results: products.length,
    data: {
      products,
    },
  });
});

/**
 * Get a single product by ID
 * @route GET /api/v1/products/:id
 * @param {string} req.params.id - Product ID
 * @access Public
 */
exports.getProduct = catchAsync(async (req, res, next) => {
  const foundProduct = await product.findById(req.params.id);
  if (!foundProduct) {
    return next(new AppError("No product found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: { product: foundProduct },
  });
});

/**
 * Update a product by ID
 * @route PATCH /api/v1/products/:id
 * @param {string} req.params.id - Product ID
 * @access Public
 */
exports.updateProduct = catchAsync(async (req, res, next) => {
  const updatedProduct = await product.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true, // return the updated document
      runValidators: true, // validate against schema
    }
  );
  if (!updatedProduct) {
    return next(new AppError("No product found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: { product: updatedProduct },
  });
});

/**
 * Delete a product by ID
 * @route DELETE /api/v1/products/:id
 * @param {string} req.params.id - Product ID
 * @access Public
 */
exports.deleteProduct = catchAsync(async (req, res, next) => {
  const deletedProduct = await product.findByIdAndDelete(req.params.id);
  if (!deletedProduct) {
    return next(new AppError("No product found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: null,
  });
});
