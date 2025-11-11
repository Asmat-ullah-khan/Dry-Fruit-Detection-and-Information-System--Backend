const mongoose = require("mongoose");
const citySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter name of the city"],
    trim: true,
  },
  province: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Province",
    required: [true, "please select the province"],
  },
});
const City = mongoose.model("City", citySchema);
module.exports = City;
