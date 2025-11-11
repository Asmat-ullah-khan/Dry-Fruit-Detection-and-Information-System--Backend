const City = require("../models/city");
const AppError = require("../util/app-errors");
const catchAsync = require("../util/catch-async");
// eslint-disable-next-line no-unused-vars
exports.createCity = catchAsync(async (req, res, next) => {
  const newCity = await City.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      city: newCity,
    },
  });
});
exports.getAllCities = catchAsync(async (req, res, next) => {
  const Cities = await City.find().populate("Province");
  if (!Cities) {
    return next(new AppError("there is no  Cities exits", 404));
  }
  res.status(200).json({
    status: "success",
    result: Cities.length,
    data: {
      Cities,
    },
  });
});
exports.getCity = catchAsync(async (req, res, next) => {
  const city = await City.findById(req.params.id);
  if (!city) {
    return next(
      new AppError(`there is no City with this  ${req.params.id} id`, 404)
    );
  }
  res.status(200).json({
    status: "success",
    data: {
      city,
    },
  });
});
exports.updateCity = catchAsync(async (req, res, next) => {
  const updateProvince = await City.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!updateProvince) {
    return next(new AppError("the city is not found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      updateProvince,
    },
  });
});
exports.deleteCity = catchAsync(async (req, res, next) => {
  const deleteCity = await City.findByIdAndDelete(req.params.id);
  if (!deleteCity) {
    return next(new AppError("the City  is not found with this Id", 404));
  }
  res.status(200).json({
    status: "success",
    data: null,
  });
});
