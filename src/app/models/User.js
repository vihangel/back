const mongoose = require("mongoose");

const User = mongoose.Schema(
  {
    name: { type: String, required: true },
    cpf: { type: String, required: true },
    renach: { type: String, required: true },
    categoria: { type: String, required: false },
    identidade: { type: String, required: false },
    data_nascimento: { type: String, required: false },
    autoescola: { type: String, required: false },
    taxa: { type: String, required: false },
    motivo: { type: String, required: false },
    //quem atendeu e o estado (pendente...q)
    psicologa: { type: String, required: false },
    status: { type: String, required: false },
    caixa: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", User);
