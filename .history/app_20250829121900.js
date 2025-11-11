/**
 * Main Express application setup.
 *
 * Features:
 * - Loads environment variables from `config.env`
 * - Parses incoming JSON requests
 * - Logs requests in development mode using Morgan
 * - Provides routes for users and products
 * - Handles undefined routes and global errors
 *
 * Routes:
 *   - /api/v1/products → Product API
 *   - /api/v1/users    → User API
 *
 * Error handling:
 *   - Catches unknown routes and forwards to AppError
 *   - Uses global error middleware for centralized error handling
 */

const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const userRouter = require("./routes/user.routes");
const golobalErrorHandler = require("./middleware/error.middleware");
const productRouter = require("./routes/product.routes");
const AppError = require("./util/app-errors");
const provinceRouter = require("./routes/province");

// Load environment variables
dotenv.config({ path: "./config.env" });

const app = express();

// Middleware: parse JSON bodies
app.use(express.json());

/**
 * Middleware: request logger
 * Enabled only in development mode.
 */
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

/**
 * Routes:
 * Product routes and User routes
 */
app.use("/api/v1/products", productRouter);
app.use("/api/v1/users", userRouter);
app.use("api/v1/province", productRouter);

/**
 * Handle all undefined routes
 * Forwards to the global error handler with a 404 error.
 */
app.all(/.*/, (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

/**
 * Global error handling middleware
 */
app.use(golobalErrorHandler);

module.exports = app;
