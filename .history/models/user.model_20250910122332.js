const mongoose = require("mongoose");
const validator = require("validator");
const userMiddleware = require("../middleware/user");
const bcrypt = require("bcryptjs");
const userSchma = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: [true, "Please Enter Your Name"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
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
      select: false,
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
    passwordChangeat: Date,

    phoneNumber: {
      type: String,
      unique: true,
      required: [true, "please provide a Phone Number"],
      match: [/^[0-9]{10,15}$/, "Please enter a valid phone number"],
    },
  },
  { timestamps: true, versionKey: false }
);

userMiddleware(userSchma);
userSchma.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
const User = mongoose.model("User", userSchma);
module.exports = User;
