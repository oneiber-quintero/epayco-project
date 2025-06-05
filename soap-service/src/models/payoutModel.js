const mongoose = require("mongoose");

const PayoutSchema = new mongoose.Schema({
  clientId: { type: String, required: true },
  transactionId: { type: String, required: true },
  total: { type: String, Number: true },
  sessionId: { type: String, required: true },
  token: { type: String, required: true },
  status: { type: String, require: true },
});

module.exports = mongoose.model("payout", PayoutSchema);
