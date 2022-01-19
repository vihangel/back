const mongoose = require("mongoose");

//Pensar em modelo de caixa e atendimento
const Caixa = mongoose.Schema(
  {
    name: { type: String, required: true },
    renach: { type: String, required: true },
    exame: { type: String, required: false },
    motivo: { type: String, required: false },
    pagamento: { type: String, required: false },
    valor: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Caixa", Caixa);
