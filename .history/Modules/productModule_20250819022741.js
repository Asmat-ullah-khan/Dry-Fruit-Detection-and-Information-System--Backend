const mongoose = require("mongoose");
const productSchma = new mongoose.Schema({
  product: {
    type: String,
    required: [true, "please add the product"],
  },
});
