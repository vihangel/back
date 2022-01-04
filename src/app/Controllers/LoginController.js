//Login futuro ADM

const User = require("../Models/UserLogin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../../config/auth");
const yup = require("yup");

class LoginController {
  async index(req, res) {
    const { name, password } = req.body;

    const userExist = await User.findOne({ name });

    if (!userExist) {
      return res.status(400).json({
        error: true,
        message: "Usuário não existe!",
      });
    }

    if (!(await bcrypt.compare(password, userExist.password))) {
      return res.status(400).json({
        error: true,
        message: "A senha está inválida!",
      });
    }

    return res.status(200).json({
      user: {
        name: userExist.name,
        email: userExist.email,
      },
      token: jwt.sign({ id: userExist._id }, config.secret, {
        expiresIn: config.expireIn,
      }),
    });
  }
  async createAdmin(req, res) {
    /**
     * Validação através do YUP schema
     * Início
     */
    let schema = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email().required(),
      password: yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: true,
        message: "Dados inválidos",
      });
    }

    /**
     * Validação através do YUP schema
     * fim
     */

    /**
     * Validação no banco de dados
     * Verifica se o usuário existe
     */

    let userExist = await User.findOne({ email: req.body.email });
    if (userExist) {
      return res.status(400).json({
        error: true,
        message: "Este usuário já existe!",
      });
    }

    /**
     * Desestrutuação dos dados da requisição
     */
    const { name, email, password } = req.body;

    /**
     * criação da constante data
     */

    const data = { name, email, password };

    /**
     * Criptografar a senha
     */

    data.password = await bcrypt.hash(data.password, 8);

    /**
     * Inserção no banco de dados
     */

    await User.create(data, (err) => {
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
}

module.exports = new LoginController();
