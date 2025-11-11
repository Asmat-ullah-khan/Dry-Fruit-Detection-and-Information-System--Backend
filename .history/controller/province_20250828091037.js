const Province = require("../models/province");
const AppError = require("../util/app-errors");
const catchAsync = require("../util/catch-async");
// eslint-disable-next-line no-unused-vars
exports.createProvince = catchAsync(async (req, res, next) => {
  const newProvince = await Province.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      province: newProvince,
    },
  });
});
exports.getAllProvinces = catchAsync(async (req, res, next) => {
  const provinces = await Province.find();
  if (!provinces || provinces.length === 0) {
    return next(new AppError("There are no provinces available", 404));
  }
  res.status(200).json({
    status: "success",
    result: provinces.length,
    data: {
      provinces,
    },
  });
});
exports.getProvince = catchAsync(async (req, res, next) => {
  const province = await Province.findById(req.params.id);
  if (!province) {
    return next(
      new AppError(`There is no province with this ID: ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    status: "success",
    data: {
      province,
    },
  });
});
exports.updateProvince = catchAsync(async (req, res, next) => {
  const updateProvince = await Province.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!updateProvince) {
    return next(new AppError("The province is not found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      updateProvince,
    },
  });
});
exports.deleteProvince = catchAsync(async (req, res, next) => {
  const deleteProvince = await Province.findByIdAndDelete(req.params.id);
  if (!deleteProvince) {
    return next(new AppError("The province is not found with this ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: null,
  });
});
