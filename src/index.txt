const { MongoClient } = require("mongodb");
// Replace the uri string with your MongoDB deployment's connection string.
//se der erro verificar ip
const uri = `mongodb+srv://angel:psicotran@psicotran.rctxh.mongodb.net/psicotran?retryWrites=true&w=majority`;
const client = new MongoClient(uri);
const dbName = "users";

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log("Connected successfully to server");

  const db = client.db(dbName);

  const collection = db.collection("user");
  const user1 = {
    id: "skf12lksdmflkdsm",
    cpf: "21234",
    renach: "21233243",
  };
  const result = await collection.insertOne(user1);
  console.log(result);
  // the following code examples can be pasted here...

  return "done.";
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());

//aplicação
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

app.listen(process.env.PORT || 3333);
