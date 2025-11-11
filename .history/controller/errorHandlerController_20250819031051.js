const AppError = require("../util/apperrors");
const handleDuplicateFieldDB=

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
    sendErrorProduction(err, res);
  }
};
