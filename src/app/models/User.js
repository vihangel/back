const mongoose = require("mongoose");

const User = mongoose.Schema(
  {
    name: { type: String, required: false },
    cpf: { type: String, required: true },
    renach: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", User);
