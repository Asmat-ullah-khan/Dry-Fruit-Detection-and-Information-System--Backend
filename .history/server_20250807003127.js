const app = require("./app");
const mongoose = require("mongoose");
const db = process.env.DATABASE_LOCAL;
const PORT = process.env.PORT;
mongoose
  .connect(db)
  .then(() => {
    console.log("✅ Database connected successfully");
  })
  .catch((err) => {
    console.log("Databse has not Connected 🔥");
  });
