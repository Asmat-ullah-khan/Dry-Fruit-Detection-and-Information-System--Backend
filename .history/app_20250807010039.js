const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
dotenv.config();
const app = express();
app.use(express.json());
if (process.env.NODE_ENV === "development") {
  app.use(morgan());
}
module.exports = app;
