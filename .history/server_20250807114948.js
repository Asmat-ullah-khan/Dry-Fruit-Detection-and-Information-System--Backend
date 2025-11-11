// handle uncaught exceptonal  handler
process.on("uncaughtException", (err) => {
  console.log("UnCaught Exception Shuting Down........🔥");
  console.log(err.name, err.message);
  process.exit(1);
});

const app = require("./app");
const mongoose = require("mongoose");
const db = process.env.DATABASE_LOCAL;
const PORT = process.env.PORT;
mongoose.connect(db).then(() => {
  console.log("✅ Database connected successfully");
});
const server = app.listen(PORT, () => {
  console.log(`the app is running on port ${PORT}`);
});
process.on("unhandledRejection", (err) => {
  console.log("UNHANDLE Rejection Shuting Down........🔥");
  console.log(err);
  server.close();
});
