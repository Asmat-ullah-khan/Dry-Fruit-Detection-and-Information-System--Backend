/**
 * Represents a custom application error with additional properties
 * to distinguish between operational (expected) and programming (unexpected) errors.
 *
 * This class extends the built-in JavaScript `Error` object, and is typically
 * used for handling HTTP-related errors in an Express.js application.
 *
 * @class AppError
 * @extends Error
 */
class AppError extends Error {
  /**
   * Create a new AppError instance.
   *
   * @param {string} message - A descriptive error message for developers and logs.
   * @param {number} statuscode - The HTTP status code (e.g., 400, 404, 500).
   *
   * @property {number} statuscode - Stores the provided HTTP status code.
   * @property {string} status - Derived from `statuscode`, either `"fail"` (for 4xx codes)
   *                             or `"error"` (for 5xx and others).
   * @property {boolean} isOperational - Marks the error as operational (safe to show to client).
   *
   * @example
   * // Throwing a 404 Not Found error
   * throw new AppError("Product not found", 404);
   *
   * @example
   * // Throwing a 500 Internal Server Error
   * throw new AppError("Something went wrong", 500);
   */
  constructor(message, statuscode) {
    super(message);
    this.statuscode = statuscode;
    this.status = `${statuscode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;
  }
}

module.exports = AppError;
