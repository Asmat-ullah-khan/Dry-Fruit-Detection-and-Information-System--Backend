const Province = require("../models/province");
const AppError = require("../util/app-errors");
const catchAsync = require("../util/catch-async");

/**
 * @desc    Create a new province
 * @route   POST /api/v1/provinces
 */
exports.createProvince = catchAsync(async (req, res, next) => {
  if (Array.isArray(req.body)) {
    if (req.body.length === 0) {
      return next(new AppError("Province data is required", 400));
    }

    const provinces = await Province.insertMany(req.body);

    return res.status(201).json({
      status: "success",
      count: provinces.length,
      data: { provinces },
    });
  }

  // If single object -> normal create
  if (!req.body.name) {
    return next(new AppError("Province name is required", 400));
  }

  const province = await Province.create(req.body);

  res.status(201).json({
    status: "success",
    data: { province },
  });
});

/**
 * @desc    Get all provinces
 * @route   GET /api/v1/provinces
 */
exports.getAllProvinces = catchAsync(async (req, res, next) => {
  const provinces = await Province.find();
  if (!provinces.length) {
    return next(new AppError("No provinces found", 404));
  }
  res.status(200).json({
    status: "success",
    count: provinces.length,
    data: { provinces },
  });
});

/**
 * @desc    Get single province by ID
 * @route   GET /api/v1/provinces/:id
 */
exports.getProvince = catchAsync(async (req, res, next) => {
  const province = await Province.findById(req.params.id);
  if (!province) {
    return next(
      new AppError(`No province found with ID: ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    status: "success",
    data: { province },
  });
});

/**
 * @desc    Update province by ID
 * @route   PATCH /api/v1/provinces/:id
 */
exports.updateProvince = catchAsync(async (req, res, next) => {
  const province = await Province.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!province) {
    return next(new AppError("Province not found", 404));
  }
  res.status(200).json({
    status: "success",
    data: { province },
  });
});

/**
 * @desc    Delete province by ID
 * @route   DELETE /api/v1/provinces/:id
 */
exports.deleteProvince = catchAsync(async (req, res, next) => {
  const province = await Province.findByIdAndDelete(req.params.id);
  if (!province) {
    return next(new AppError("Province not found", 404));
  }
  res.status(204).json({
    status: "success",
    data: "null",
  });
});
