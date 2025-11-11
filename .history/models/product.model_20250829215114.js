const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    product: {
      type: String,
      required: [true, "Please add the product name"],
      trim: true,
      enum: [
        "Almond",
        "Cashew",
        "Figs",
        "Raisin",
        "Peanut",
        "Pistachio",
        "Walnut",
      ],
    },
    description: {
      type: String,
      required: [true, "Please provide description"],
    },
    calories: {
      type: Number,
      required: [true, "Please enter calories"],
      min: [0, "Calories must be a positive number"],
    },
    protein: {
      type: Number,
      required: [true, "Please enter protein"],
      min: [0, "Protein must be a positive number"],
    },
    carbs: {
      type: Number,
      required: [true, "Please enter carbs"],
      min: [0, "Carbs must be a positive number"],
    },
    fats: {
      type: Number,
      required: [true, "Please enter fats"],
      min: [0, "Fats must be a positive number"],
    },
    price: {
      type: Number,
      required: [true, "Please enter price"],
      min: [0, "Price must be a positive number"],
    },
    city: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "City",
      required: true,
    },
    province,
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
