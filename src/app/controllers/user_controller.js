const User = require('../models/user');
const Bot = require("../bot/bot");
const yup = require("yup");

//se for ter senha tem como add criptografia
class UserController {
  async show(req, res) {
    const users = await User.find();

    return res.status(200).json({
      error: false,
      users,
    });
  }

  async store(req, res) {
    //validação
    let schema = yup.object().shape({
      cpf: yup.string().required(),
      renach: yup.string().required(),
    });
    console.log(req.body);
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: true,
        message: "Dados inválidos",
      });
    }

    let userExist = await User.findOne({ cpf: req.body.cpf });
    if (userExist) {
      return res.status(400).json({
        error: true,
        message: "Este usuário já existe!",
      });
    }

    const { cpf, renach } = req.body;

    const fullUserr = await Bot.collectDataFromBrowser(renach, cpf);

    if (fullUserr == null) {
      //Ver qual o codigo de bad request
      return res.status(400).json({
        error: true,
        message: "Algo deu errado, tente novamente!",
      });
    }

    var fullUser = {
      name: fullUserr[1],
      cpf: cpf,
      renach: renach,
      categoria: fullUserr[4],
      identidade: fullUserr[2],
      data_nascimento: fullUserr[3],
      autoescola: fullUserr[0],
      taxa: fullUserr[5],
      motivo: fullUserr[6],
    };

    let user = await User.create(fullUser, (err) => {
      if (err)
        return res.status(400).json({
          error: true,
          message: "Erro ao tentar inserir usuário no MongoDB",
        });

      return res.status(200).json({
        error: false,
        message: "Usuário cadastrado com sucesso",
      });
    });
  }
}

module.exports = new UserController();
