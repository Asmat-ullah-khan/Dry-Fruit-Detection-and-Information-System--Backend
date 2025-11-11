const mongoose = require("mongoose");
const dotenv = require("dotenv");
const fs = require("fs");
const product = require("../../models/product.model");
dotenv.config({ path: "../../config.env" });
mongoose.connect(process.env.DATABASE_LOCAL).then(() => {
  console.log("database connected sucessfully");
});
//reading file
const product= 
