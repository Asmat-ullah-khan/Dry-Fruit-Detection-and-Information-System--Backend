const Shop = require("../models/shop");
const City = require("../models/city");
const AppError = require("../util/app-errors");
const catchAsync = require("../util/catch-async");

// Create Shop
exports.createShop = catchAsync(async (req, res, next) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return next(new AppError("No shop data provided", 400));
  }

  const shop = await Shop.create(req.body);

  res.status(201).json({
    status: "success",
    data: { shop },
  });
});

// Get All Shops (with nested city + province)
exports.getAllShops = catchAsync(async (req, res, next) => {
  const shops = await Shop.find().populate({
    path: "city",
    select: "name",
    populate: {
      path: "province",
      select: "name",
    },
  });

  if (!shops || shops.length === 0) {
    return next(new AppError("No shops found", 404));
  }

  res.status(200).json({
    status: "success",
    count: shops.length,
    data: { shops },
  });
});

// Get Single Shop
exports.getShop = catchAsync(async (req, res, next) => {
  const shop = await Shop.findById(req.params.id).populate({
    path: "city",
    select: "name",
    populate: {
      path: "province",
      select: "name",
    },
  });

  if (!shop) {
    return next(new AppError("No shop found with this ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: { shop },
  });
});

// Update Shop
exports.updateShop = catchAsync(async (req, res, next) => {
  const allowedUpdates = ["name", "address", "contact", "city"];
  const updates = { ...req.body };
  Object.keys(updates).forEach((key) => {
    if (!allowedUpdates.includes(key)) {
      delete updates(key);
    }
  });
  if (updates.city) {
    const cityExists = await City.findById(updates.city);
    if (!cityExists) {
      return next(
        new AppError(`City with ID '${updates.city}' not found`, 404)
      );
    }
  }
});

// Delete Shop
exports.deleteShop = catchAsync(async (req, res, next) => {
  const shop = await Shop.findByIdAndDelete(req.params.id);

  if (!shop) {
    return next(new AppError("No shop found with this ID", 404));
  }

  res.status(204).json({
    // 204 = No Content
    status: "success",
    data: null,
  });
});
