const mongoose = require("mongoose");
const dotenv = require("dotenv");
const fs = require("fs");
const product = require("../../models/product.model");

dotenv.config({ path: "../../config.env" });
mongoose.connect(process.env.DATABASE_LOCAL).then(() => {
  console.log("database connected sucessfully");
});
//reading file
const products = JSON.parse(
  fs.readFileSync(`${__dirname}product.json`, "utf-8")
);
const importData = async () => {
  try {
    await product.create(products);
    console.log("the data is sucessully inserted");
    process.exit();
  } catch (err) {
    console.log(err);
  }
};
const deleteData = async () => {
  await products.deleteMany();
  console.log("the data has been deleted");
  process.exit();
};
