const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const userSchma = new mongoose.Schema({
  firstName: {
    type: String,
  },
});
