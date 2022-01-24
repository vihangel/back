//Login futuro ADM

const autoescolas = require("../models/autoescolas");
const Psicos = require("../models/psicologas");
const Testes = require("../models/testes");
const yup = require("yup");

class ExtrasControllers {
  async indexAutoEscolas(req, res) {
    return res.status(200).json({});
  }

  async indexPsicos(req, res) {
    return res.status(200).json({});
  }

  async indexTestes(req, res) {
    return res.status(200).json({});
  }

  async addAutoEscola(req, res) {
    /**
     * Validação através do YUP schema
     * Início
     */
    let schema = yup.object().shape({
      name: yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: true,
        message: "Dados inválidos",
      });
    }

    let autoescolasExist = await autoescolas.findOne({ name: req.body.name });
    if (autoescolasExist) {
      return res.status(400).json({
        error: true,
        message: "Este usuário já existe!",
      });
    }

    const { name } = req.body;
    const data = { name };
    await autoescolas.create(data, (err) => {
      if (err)
        return res.status(400).json({
          error: true,
          message: "Erro ao tentar inserir usuário no MongoDB",
        });

      return res.status(200).json({
        error: false,
        message: "Usuário Cadastrado com sucesso",
      });
    });
  }
  async addPsico(req, res) {
    let schema = yup.object().shape({
      name: yup.string().required(),
      identificacao: yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: true,
        message: "Dados inválidos",
      });
    }

    let PsicosExist = await Psicos.findOne({ name: req.body.name });
    if (PsicosExist) {
      return res.status(400).json({
        error: true,
        message: "Este usuário já existe!",
      });
    }

    const { name } = req.body;
    const data = { name };
    await Psicos.create(data, (err) => {
      if (err)
        return res.status(400).json({
          error: true,
          message: "Erro ao tentar inserir usuário no MongoDB",
        });

      return res.status(200).json({
        error: false,
        message: "Usuário Cadastrado com sucesso",
      });
    });
  }
  async addTeste(req, res) {
    let schema = yup.object().shape({
      name: yup.string().required(),
      id: yup.string().required(),
      quantidade: yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: true,
        message: "Dados inválidos",
      });
    }

    let TestesExist = await Testes.findOne({ id: req.body.id });
    if (TestesExist) {
      return res.status(400).json({
        error: true,
        message: "Este teste já foi adicionado!",
      });
    }

    const { name, id, quantidade } = req.body;
    const data = { name, id, quantidade };
    await Testes.create(data, (err) => {
      if (err)
        return res.status(400).json({
          error: true,
          message: "Erro ao tentar inserir teste no MongoDB",
        });

      return res.status(200).json({
        error: false,
        message: "Teste Cadastrado com sucesso",
      });
    });
  }
}

module.exports = new ExtrasControllers();
