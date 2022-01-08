const mongoose = require("mongoose");

const AutoEscola = mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("AutoEscola", AutoEscola);
