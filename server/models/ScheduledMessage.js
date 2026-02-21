const mongoose = require("mongoose");

const scheduledSchema = new mongoose.Schema({
  message: String,
  scheduledFor: Date,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("ScheduledMessage", scheduledSchema);
