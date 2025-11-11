const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const userRouter = require("./routes/userRoute");
const golobalErrorHandler = require("./controller/errorHandlerController");
const AppError = require("./util/apperrors");
dotenv.config();
const app = express();
app.use(express.json());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
//routes
app.use("/api/v1/users", userRouter);
app.all(/.*/, (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(golobalErrorHandler);
module.exports = app;
