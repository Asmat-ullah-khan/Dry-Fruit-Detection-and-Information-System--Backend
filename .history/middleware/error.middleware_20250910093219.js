const AppError = require("../util/app-errors");
//handle duplicate fields erro
const handleDuplicateFieldDB = (err) => {
  const value = Object.values(err.keyValue)[0];
  const message = `Duplicate field value: "${value}". Please use another value!`;
  return new AppError(message, 400);
};
//handle validation error(if user not enter the required filed)
const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input Data: ${errors.join(". ")}`;
  return new AppError(message, 400);
};
//handle invlaid id format erro
const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}. Please use a valid ID format. `;
  return new AppError(message, 400);
};
const handleJsonWebTokenError=(err)=>{
  const message=
}

const sendErrorDev = (err, res) => {
  res.status(err.statuscode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    error: err,
  });
};
const sendErrorProduction = (err, res) => {
  if (err.isOperational) {
    res.status(err.statuscode).json({
      status: err.status,
      message: err.message,
    });
  }
  // unknown error in programing that is not  handle in the programming
  else {
    console.error("ERROR 💥", err);
    res.status(500).json({ status: "error", message: "Something went wrong" });
  }
};
// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  err.statuscode = err.statuscode || 500;
  err.status = err.status || "error";
  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    if (err.code === 11000) err = handleDuplicateFieldDB(err);
    if (err.name === "ValidationError") err = handleValidationErrorDB(err);
    if (err.name === "CastError") err = handleCastErrorDB(err);
    if (err.name === "JsonWebTokenError") err = handleJsonWebTokenError(err);
    sendErrorProduction(err, res);
  }
};
