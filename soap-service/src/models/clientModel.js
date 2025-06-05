const mongoose = require("mongoose");

const ClientSchema = new mongoose.Schema({
  document: { type: String, required: true, unique: true },
  names: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  cellphone: { type: String, required: true },
  balance: { type: Number, default: 0 },
});

module.exports = mongoose.model("Client", ClientSchema);
