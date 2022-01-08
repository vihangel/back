const mongoose = require("mongoose");

//Pensar em modelo de caixa e atendimento
const Day = mongoose.Schema(
  {
    name: { type: String, required: false },
    cpf: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("day", Day);
