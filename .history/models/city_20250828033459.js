const mongoose = require("mongoose");
const citySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter name of the city"],
    trim: true,
  },
});
