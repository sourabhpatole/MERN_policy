const mongoose = require("mongoose");

const userAccountSchema = new mongoose.Schema({
  accountName: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("UserAccount", userAccountSchema);
