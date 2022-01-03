const express = require("express");
const cors = require("cors");

const { v4: uuidv4, validate } = require("uuid");
const { response } = require("express");

const app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(cors());

const users = [];

function checksExistsUserAccount(request, response, next) {
  const { cpf } = request.headers;

  const user = users.some((user) => user.cpf === cpf);

  if (!user) {
    return response.status(404).json({ error: "Usuário não encontrado" });
  }

  request.user = user;

  return next();
}

app.post("/usuario", (request, response) => {
  const { cpf, renach } = request.body;

  const userExists = users.some((user) => user.cpf === cpf);

  if (userExists) {
    return response.status(404).json({ error: "cpf ja cadastrado" });
  }

  users.push({
    renach,
    cpf,
    id: uuidv4(),
  });

  return response.status(201).send(users);
});

//todos os usuarios
app.get("/usuarios", (request, response) => {
  return response.status(201).json(users);
});

//usuario especifico
app.get("/usuario", checksExistsUserAccount, (request, response) => {
  return response.status(201).json(users);
});

//retornar a lista json com tudo porem depois eu arrumo
app.put("/editar", (request, response) => {
  const { cpf } = request.body;
  const { user } = request;
  user.cpf = cpf;
  return response.status(201).send();
});

//deleta user
app.delete("/usuario", checksExistsUserAccount, (request, response) => {
  const { user } = request;

  users.splice(users.indexOf(user, 1), 1);
  response.status(200).json();
});

app.listen(3333);
