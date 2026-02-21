const mongoose = require("mongoose");

const lobSchema = new mongoose.Schema({
  category: String,
});

module.exports = mongoose.model("LOB", lobSchema);
