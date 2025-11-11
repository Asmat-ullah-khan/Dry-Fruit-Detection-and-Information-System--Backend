const mongoose = require("mongoose");
const productSchma = new mongoose.Schema({
  product: {
    type: String,
    required: [true, "please add the product"],
  },
  description: {
    type: String,
    required: [true, "please provide descripition"],
  },
  calories: {
    type: String,
    required: [true, "please enter calories"],
  },
  protien: {
    type: String,
    required: [true, "please enter protien"],
  },
  carbs: {
    type: String,
    required: [true, "please enter the carbs"],
  },
  fats: {
    type: String,
    required: [true, "please enter the fats"],
  },
  price: {
    type: String,
    required: [true, "please enter the price"],
  },
  province: {
    type: String,
    required: [true, "please enter the province"],
  },
});
const Product = mongoose.model;
