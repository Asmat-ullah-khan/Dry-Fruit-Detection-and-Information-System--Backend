const City = require("../models/city");
const Province=require('../models/province');
const AppError = require("../util/app-errors");
const catchAsync = require("../util/catch-async");

/**
 * @desc    Create a new city
 * @route   POST /api/v1/cities
 */
exports.createCity = catchAsync(async (req, res, next) => {
  const { name, provine } = req.body;
  if (!name || !provine) {
    return next(new AppError("there is  no  name of province", 400));
  }
  const provincedoc= await Province.findById(provine);
  if(!provincedoc)
  const city = await City.create(req.body);

  res.status(201).json({
    status: "success",
    data: { city },
  });
});

/**
 * @desc    Get all cities
 * @route   GET /api/v1/cities
 */
exports.getAllCities = catchAsync(async (req, res, next) => {
  const cities = await City.find().populate("province", "name");

  if (!cities || cities.length === 0) {
    return next(new AppError("No cities found", 404));
  }

  res.status(200).json({
    status: "success",
    count: cities.length,
    data: { cities },
  });
});

/**
 * @desc    Get single city by ID
 * @route   GET /api/v1/cities/:id
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
 * @desc    Update city
 * @route   PATCH /api/v1/cities/:id
 */
exports.updateCity = catchAsync(async (req, res, next) => {
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
 * @desc    Delete city
 * @route   DELETE /api/v1/cities/:id
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
