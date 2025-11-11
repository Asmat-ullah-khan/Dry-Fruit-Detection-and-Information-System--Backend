const mongoose = require("mongoose");
const dotenv = require("dotenv");
const fs = require("fs");
const Product = require("../../models/product.model");

dotenv.config({ path: "./config.env" });

mongoose
  .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected successfully"));

// Reading file
const products = JSON.parse(
  fs.readFileSync(`${__dirname}/product.json`, "utf-8")
);

// Import data into DB
const importData = async () => {
  try {
    await Product.create(products);
    console.log("Data successfully inserted!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

// Delete all data from DB
const deleteData = async () => {
  try {
    await Product.deleteMany();
    console.log("Data successfully deleted!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

// Run based on command
if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
