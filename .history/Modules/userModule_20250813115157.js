const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const userSchma = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    require:
  },
  lastName: {
    type: String,
    trim: true,
  },
  email:{
    type:String,
    unique:true,
    validator: 
  }
});
