const Season = require("../models/season");
exports.create = async (data) => {
  return await Season.create(data);
};
exports.findAll = async () => {
  return await Season.find({}, "name startDate endDate").populate(
    "dryFruits",
    "product -_id"
  );
};
exports.findById = async (id) => {
  return await Season.findById(id).populate("dryFruits", " product -_id");
};
exports.update = async (id, data) => {
  return await Season.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  }).populate("dryFruits");
};
exports.delete = async (id) => {
  return await Season.findByIdAndDelete(id);
};

exports.findCurrentSeason = async () => {
  const now = new Date();
  const startOfToday = new Date(now);
  startOfToday.setHours(0, 0, 0, 0);
  const endOfToday = new Date(now);
  endOfToday.setHours(23, 59, 59, 999);

  console.log(
    "Checking seasons for:",
    startOfToday.toISOString(),
    "->",
    endOfToday.toISOString()
  );

  return await Season.findOne({
    startDate: { $lte: endOfToday },
    endDate: { $gte: startOfToday },
  }).populate("dryFruits", "product image -_id");
};

exports.countDocument = async () => {
  return await Season.countDocuments();
};
