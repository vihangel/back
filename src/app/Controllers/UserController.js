const User = require("../models/User");
const Bot = require("../bot/bot");
const yup = require("yup");

//se for ter senha tem como add criptografia
class UserController {
  show(req, res) {
    var users = ["031", "123", "1234"];
    return res.status(200).json({
      error: false,
      //verificar user?
      users,
    });
  }

  async store(req, res) {
    //validação
    let schema = yup.object().shape({
      cpf: yup.string().required(),
      renach: yup.string().required(),
      //nome: yup.string(),
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
    const fullUserr = await Bot.collectDataFromBrowser();
    if (fullUserr == null) {
      await Bot.collectDataFromBrowser();
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
    };
    // const data = {
    //   cpf,
    //   renach,
    // };

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
