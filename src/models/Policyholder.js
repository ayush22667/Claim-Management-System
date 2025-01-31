const mongoose = require("mongoose");

const PolicyholderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  policies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Policy", required: true }],
  purchaseDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Policyholder", PolicyholderSchema);
