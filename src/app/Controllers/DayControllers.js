const Caixa = require("../models/caixa");

const yup = require("yup");

//se for ter senha tem como add criptografia
class UserController {
  async show(req, res) {
    const users = await Caixa.find();

    return res.status(200).json({
      error: false,
      users,
    });
  }

  async store(req, res) {}

  async storeCaixa(req, res) {
    //validação
    // let schema = yup.object().shape({
    //   renach: yup.string().required(),
    // });
    // if (!(await schema.isValid(req.body))) {
    //   return res.status(400).json({
    //     error: true,
    //     message: "Dados inválidos",
    //   });
    // }
    // let userExist = await Caixa.findOne({ renach: req.body.cpf });
    // if (userExist) {
    //   return res.status(400).json({
    //     error: true,
    //     message: "Este usuário já foi para o Caixa",
    //   });
    // }
    // const { cpf, renach } = req.body;
    // if (fullUserr == null) {
    //   //Ver qual o codigo de bad request
    //   return res.status(400).json({
    //     error: true,
    //     message: "Algo deu errado, tente novamente!",
    //   });
    // }
    // var fullUser = {
    //   name: fullUserr[1],
    //   cpf: cpf,
    //   renach: renach,
    //   categoria: fullUserr[4],
    //   identidade: fullUserr[2],
    //   data_nascimento: fullUserr[3],
    //   autoescola: fullUserr[0],
    //   taxa: fullUserr[5],
    // };
    // let user = await Caixa.create(fullUser, (err) => {
    //   if (err)
    //     return res.status(400).json({
    //       error: true,
    //       message: "Erro ao tentar inserir usuário no MongoDB",
    //     });
    //   return res.status(200).json({
    //     error: false,
    //     message: "Usuário cadastrado com sucesso",
    //   });
    // });
  }
  async showCaixa(req, res) {
    const caixa = await Caixa.find();

    return res.status(200).json({
      error: false,
      caixa,
    });
  }
}

module.exports = new UserController();
