const AppError = require("../util/app-errors");

/**
 * Handle duplicate field errors in MongoDB (error code 11000).
 * Extracts the duplicate value from `err.keyValue` and returns an AppError.
 *
 * @param {Object} err - The MongoDB error object.
 * @param {Object} err.keyValue - The duplicate key-value pair.
 * @returns {AppError} A new AppError instance with a descriptive message.
 */
const handleDuplicateFieldDB = (err) => {
  const value = Object.values(err.keyValue)[0];
  const message = `Duplicate field value: "${value}". Please use another value!`;
  return new AppError(message, 400);
};

/**
 * Handle Mongoose validation errors.
 * Collects all error messages from `err.errors` and returns an AppError.
 *
 * @param {Object} err - The Mongoose validation error object.
 * @param {Object} err.errors - Object containing validation error details.
 * @returns {AppError} A new AppError instance with validation messages.
 */
const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input Data: ${errors.join(". ")}`;
  return new AppError(message, 400);
};

/**
 * Handle invalid MongoDB ObjectId format errors.
 * For example, when an invalid ID is passed in the request.
 *
 * @param {Object} err - The Mongoose CastError object.
 * @param {string} err.path - The field name where the error occurred.
 * @param {string} err.value - The invalid value that was provided.
 * @returns {AppError} A new AppError instance with a descriptive message.
 */
const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}. Please use a valid ID format. `;
  return new AppError(message, 400);
};

/**
 * Send detailed error information in development mode.
 *
 * @param {AppError} err - The error object.
 * @param {import("express").Response} res - Express response object.
 */
const sendErrorDev = (err, res) => {
  res.status(err.statuscode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    error: err,
  });
};

/**
 * Send limited error information in production mode.
 * If the error is operational, return its message, otherwise log and return a generic message.
 *
 * @param {AppError} err - The error object.
 * @param {import("express").Response} res - Express response object.
 */
const sendErrorProduction = (err, res) => {
  if (err.isOperational) {
    res.status(err.statuscode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error("ERROR 💥", err);
    res.status(500).json({ status: "error", message: "Something went wrong" });
  }
};

/**
 * Global error handling middleware for Express.
 * Decides error response format based on environment (development or production).
 * Handles duplicate fields, validation errors, and cast errors specifically.
 *
 * @function
 * @param {AppError|Error} err - The error object.
 * @param {import("express").Request} req - Express request object.
 * @param {import("express").Response} res - Express response object.
 * @param {import("express").NextFunction} next - Express next middleware function.
 */
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
    sendErrorProduction(err, res);
  }
};
