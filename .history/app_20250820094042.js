const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const userRouter = require("./routes/user.routes");
const golobalErrorHandler = require("./middleware/error.middleware");
const productController = require("./controller/product.controller");
const AppError = require("./util/app-errors");
dotenv.config({ path: "./config.env" });

const app = express();
app.use(express.json());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
//routes
app.use("/api/v1/products", productController);
app.use("/api/v1/users", userRouter);
app.all(/.*/, (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(golobalErrorHandler);
module.exports = app;
