const mongoose = require("mongoose");

const carrierSchema = new mongoose.Schema({
  name: String,
});

module.exports = mongoose.model("Carrier", carrierSchema);
