const mongoose = require("mongoose");
const productSchma = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
});
