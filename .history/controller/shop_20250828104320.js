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
});
