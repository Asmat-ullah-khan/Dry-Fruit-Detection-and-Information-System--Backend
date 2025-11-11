const mongoose = require("mongoose");
const provinceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "pleae enter the name for the province"],
      unique: true,
    },
  },
  { timestamps: true }
);
const province = mongoose.model();
