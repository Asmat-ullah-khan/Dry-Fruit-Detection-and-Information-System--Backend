const Shop = require("../models/shop");
const AppError = require("../util/app-errors");
const catchAsync = require("../util/catch-async");
exports.createShop = catchAsync(async (req, res, next) => {
  const newShop = await Shop.create(req.body);
  if (!req.body) {
    return next(new AppError("No shop data provided", 400));
  }
  res.status(201).json({
    status: "success",
    data: {
      shop: newShop,
    },
  });
});
exports.getAllShops = catchAsync(async (req, res, next) => {
  const shops = await Shop.find().populate({
    path: "City",
    select: "name",
    populate: {
      path: "Province",
      select: "name",
    },
  });
  if (!shops || shops.length === 0) {
    return next(new AppError("No shops found", 404));
  }
  res.status(200).json({
    status: "success",
    count: shops.length,
    data: {
      shops,
    },
  });
});
exports.getShop = catchAsync(async (req, res, next) => {
  const shop = await Shop.findById(req.params.id).populate({
    path: "City",
    select: "name",
    populate: {
      path: "Province",
      select: "name",
    },
  });
  if (!shop) {
    return next(new AppError("the shop is not found"));
  }
  res.status(200).json({
    status: "success",
    data: {
      shop,
    },
  });
});
exports.updateShop = catchAsync(async (req, res, next) => {
  const updateShop = await Shop.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
});
