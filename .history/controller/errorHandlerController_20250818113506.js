const AppError = require("../util/apperrors");
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

module.exports = (err, req, res, next) => {
  err.statuscode = err.statuscode || 500;
  err.status = err.status || "error";
};
