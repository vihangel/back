import { find, findOne, create } from "../models/user";
import { collectDataFromBrowser } from "../bot/bot";
import { object, string } from "yup";

//se for ter senha tem como add criptografia
class UserController {
  async show(req, res) {
    const users = await find();

    return res.status(200).json({
      error: false,
      users,
    });
  }

  async store(req, res) {
    //validação
    let schema = object().shape({
      cpf: string().required(),
      renach: string().required(),
    });
    console.log(req.body);
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: true,
        message: "Dados inválidos",
      });
    }

    let userExist = await findOne({ cpf: req.body.cpf });
    if (userExist) {
      return res.status(400).json({
        error: true,
        message: "Este usuário já existe!",
      });
    }

    const { cpf, renach } = req.body;

    const fullUserr = await collectDataFromBrowser(renach, cpf);

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

    let user = await create(fullUser, (err) => {
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

export default new UserController();
