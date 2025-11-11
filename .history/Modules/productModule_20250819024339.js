const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    product: {
      type: String,
      required: [true, "Please add the product name"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please provide description"],
    },
    calories: {
      type: Number,
      required: [true, "Please enter calories"],
    },
    protein: {
      type: Number,
      required: [true, "Please enter protein"],
    },
    carbs: {
      type: Number,
      required: [true, "Please enter carbs"],
    },
    fats: {
      type: Number,
      required: [true, "Please enter fats"],
    },
    price: {
      type: Number,
      required: [true, "Please enter price"],
    },
    province: {
      type: String,
      required: [true, "Please enter province"],
      trim: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
