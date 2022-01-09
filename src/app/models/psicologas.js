const mongoose = require("mongoose");

const Psicos = mongoose.Schema(
  {
    name: { type: String, required: true },
    identificacao: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("psicos", Psicos);
