const mongoose = require("mongoose");

const agentSchema = new mongoose.Schema({
  name: { type: String, required: true, index: true },
});

module.exports = mongoose.model("Agent", agentSchema);
