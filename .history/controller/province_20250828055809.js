const Province = require("../controller/province");
const AppError = require("../util/app-errors");
const catchAsync = require("../util/catch-async");
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
  if (!provinces) {
    return next(new AppError("there is no  provinces exits", 404));
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
      new AppError(`there is no product with this  ${req.params.id} id`, 404)
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
    return next(new AppError("the province is not found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      updateProvince,
    },
  });
});
