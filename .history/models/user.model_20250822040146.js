const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

/**
 * User schema definition for MongoDB using Mongoose.
 * Includes personal details, authentication fields, and validation rules.
 *
 * @typedef {Object} User
 * @property {string} firstName - User's first name (required, trimmed).
 * @property {string} lastName - User's last name (required, trimmed).
 * @property {string} role - User's role in the system ("user" or "admin"), defaults to "user".
 * @property {string} email - User's email address (required, unique, lowercase, validated).
 * @property {string} password - Hashed password (required, minimum length 8, not returned by queries).
 * @property {string} passwordConfirm - Password confirmation (must match password).
 * @property {string} phoneNumber - User's phone number (required, unique, validated with regex).
 * @property {Date} createdAt - Auto-generated timestamp for creation.
 * @property {Date} updatedAt - Auto-generated timestamp for updates.
 */
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
        message: "The Password is not Matched",
      },
    },
    phoneNumber: {
      type: String,
      unique: true,
      required: [true, "Please provide a Phone Number"],
      match: [/^[0-9]{10,15}$/, "Please enter a valid phone number"],
    },
  },
  { timestamps: true }
);

/**
 * Mongoose pre-save middleware.
 * If the password field is modified, hashes the password with bcrypt before saving.
 * Removes `passwordConfirm` field so it won't be stored in the database.
 *
 * @function
 * @name preSavePasswordHash
 * @memberof User
 * @param {import("mongoose").HookNextFunction} next - The next middleware function.
 */
userSchma.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

/**
 * User model based on the schema.
 * Provides CRUD operations on the `users` collection in MongoDB.
 *
 * @constant
 * @type {import("mongoose").Model<User>}
 */
const User = mongoose.model("User", userSchma);

module.exports = User;
