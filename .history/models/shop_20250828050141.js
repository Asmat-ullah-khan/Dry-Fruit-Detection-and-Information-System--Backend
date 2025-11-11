const mongoose = require("mongoose");
const shopSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter the shop name"],
    trim: true,
  },
  address: {
    type: String,
    trim: true,
  },
  contact: {},
});
