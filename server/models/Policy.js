const mongoose = require("mongoose");

const policySchema = new mongoose.Schema({
  policyNumber: { type: String, index: true },
  policyStartDate: Date,
  policyEndDate: Date,
  premiumAmount: Number,
  policyCategory: String,

  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  agentId: { type: mongoose.Schema.Types.ObjectId, ref: "Agent" },
  carrierId: { type: mongoose.Schema.Types.ObjectId, ref: "Carrier" },
  lobId: { type: mongoose.Schema.Types.ObjectId, ref: "LOB" },
});

module.exports = mongoose.model("Policy", policySchema);
