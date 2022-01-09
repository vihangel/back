const mongoose = require("mongoose");

const Teste = mongoose.Schema(
  {
    name: { type: String, required: true },
    id: { type: String, required: true },
    quantidade: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("teste", Teste);
