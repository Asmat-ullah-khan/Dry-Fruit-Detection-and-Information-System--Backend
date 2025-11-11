const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const golobalErrorHandler = require("./controller/errorHandlerController");
const AppError = require("./util/apperrors");
dotenv.config();
const app = express();
app.use(express.json());
if (process.env.NODE_ENV === "development") {
  app.use(morgan());
}
app.all("*", (req, res, next) => {
  next(new AppError());
});
app.use(golobalErrorHandler);
module.exports = app;
