const Shop = require("../models/shop");
const AppError = require("../util/app-errors");
const catchAsync = require("../util/catch-async");
exports.createShop = catchAsync(async (req, resizeBy, next) => {
  const newShop = await Shop.create(req.body);
});
