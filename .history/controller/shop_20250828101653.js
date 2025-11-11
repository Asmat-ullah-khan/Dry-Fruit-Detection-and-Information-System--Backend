const Shop = require("../models/shop");
const AppError = require("../util/app-errors");
const catchAsync = require("../util/catch-async");
exports.createShop = catchAsync(async (req, resizeBy, next) => {
  const newShop = await Shop.create(req.body);
  if (!req.body.length === 0) {
    return next(new AppError("no shop is availiable"));
  }
  resizeBy.satatus(201).json({
    status: "success",
    data: {
      shop: newShop,
    },
  });
});
