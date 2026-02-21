const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, index: true },
  dob: Date,
  address: String,
  phone: String,
  state: String,
  zipCode: String,
  email: { type: String, index: true },
  gender: String,
  userType: String,
});

module.exports = mongoose.model("User", userSchema);
