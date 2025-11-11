const City = require("../models/city");
const Province = require("../models/province");
const AppError = require("../util/app-errors");
const catchAsync = require("../util/catch-async");

/**
 * Create a new city
 * @route POST /api/v1/cities
 * @access Public
 */
exports.createCity = catchAsync(async (req, res, next) => {
  const { name, province } = req.body;

  if (!name || !province) {
    return next(new AppError("City name and Province ID are required", 400));
  }

  const provinceDoc = await Province.findById(province);
  if (!provinceDoc) {
    return next(new AppError(`Province with ID '${province}' not found`, 404));
  }

  const city = await City.create({ name, province });

  res.status(201).json({
    status: "success",
    data: { city },
  });
});

/**
 * Get all cities
 * @route GET /api/v1/cities
 * @access Public
 */
exports.getAllCities = catchAsync(async (req, res, next) => {
  const cities = await City.find().populate("province", "name");

  if (!cities || cities.length === 0) {
    return next(new AppError("No cities found", 404));
  }
  const cityFormatting = cities.map((city) => ({
    ...city.toObject(),
    province: city.province.name,
  }));

  res.status(200).json({
    status: "success",
    count: cities.length,
    data: { cities },
  });
});

/**
 * Get a single city by ID
 * @route GET /api/v1/cities/:id
 * @access Public
 */
exports.getCity = catchAsync(async (req, res, next) => {
  const city = await City.findById(req.params.id).populate("province", "name");

  if (!city) {
    return next(new AppError(`No city found with ID: ${req.params.id}`, 404));
  }

  res.status(200).json({
    status: "success",
    data: { city },
  });
});

/**
 * Update a city by ID
 * @route PATCH /api/v1/cities/:id
 * @access Public
 */
exports.updateCity = catchAsync(async (req, res, next) => {
  const { province } = req.body;

  if (province) {
    const provinceDoc = await Province.findById(province);
    if (!provinceDoc) {
      return next(
        new AppError(`Province with ID '${province}' not found`, 404)
      );
    }
  }

  const city = await City.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!city) {
    return next(new AppError("No city found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: { city },
  });
});

/**
 * Delete a city by ID
 * @route DELETE /api/v1/cities/:id
 * @access Public
 */
exports.deleteCity = catchAsync(async (req, res, next) => {
  const city = await City.findByIdAndDelete(req.params.id);

  if (!city) {
    return next(new AppError("No city found with that ID", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});
