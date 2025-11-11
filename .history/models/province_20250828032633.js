const mongooe = require("mongoose");
const provinceSchema = new mongooe.Schema(
  {
    name: {
      type: String,
      required: [true, "pleae enter the name for the province"],
      unique: true,
    },
  },
  { timestamps: true}
);
const province=
