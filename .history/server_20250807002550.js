const app = require("./app");
const mongoose = require("mongoose");
const db = process.env.DATABASE_LOCAL;
const PORT = process.env.PORT;
mongoose.connect(db).then(() => {
  console.log("databse connected sucessful");
});
