const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const userSchma = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    required: [true, "Please Enter Your Name"],
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, "Please Enter Your lastName"],
  },
  email: {
    type: String,
    required: [true, "Plese Enter Emal bro"],
    unique: true,
    validate: [validator.isEmail, "Please Enter valid Email"],
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Please Provide a Password"],
    minlength: 8,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please Conirm Password"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "the Password is not Matched",
    },
  },
  phoneNumber: {
    type: String,
    unique: true,
    required: [true, "please provide a Phone Number"],
    match: [/^[0-9]{10,15}$/, "Please enter a valid phone number"],
  },
});
userSchma.pre("save", async function () {});
