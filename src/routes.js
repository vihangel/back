const { Router } = require("express");
//https://www.youtube.com/watch?v=iJMG5qIYf-A&list=PLZO_SqCI6cXa2kqP-q7je-BEmhcA3ybVo&index=4
const AuthMiddleware = require("./app/midleware/AuthMidleware");
const UserController = require("./app/Controllers/UserController");
const LoginController = require("./app/Controllers/LoginController");
const ExtrasControllers = require("./app/Controllers/ExtrasControllers");
const DaysControllers = require("./app/Controllers/DayControllers");

/*
[x] Aws publicado
[x] Buscando dados no site do detran pelo cpf e Renach
[+] Banco de dados com psicologos e Autoescolas criando {Falta buscar} !Important
[ ] Ver como vai ser a API das listas diarias e alterações de teste, reteste e essas coisas dos usuarios
[ ] Listar todos os Users !Important
[ ] Futuramente implentar um banco para cada Admin ou clinica sl
[ ] Ver os dados que precisa de Psicologos, AutoEscolas e Testes
[ ] Arrumar o idioma ta tudo misturado!
*/

const routes = new Router();

//user post esta com o pupeetter ativo, ver com lo se deixa nvegador aberto ou não
routes.post("/user", AuthMiddleware, UserController.store);
routes.get("/user", AuthMiddleware, UserController.show);

routes.post("/login", LoginController.index);
routes.post("/createAdmin", LoginController.createAdmin);

//esse é de teste
//routes.get("/teste", UserController.show);

routes.get("/autoEscolas", AuthMiddleware, ExtrasControllers.indexAutoEscolas);
routes.post("/autoEscolas", AuthMiddleware, ExtrasControllers.addAutoEscola);

routes.get("/psico", AuthMiddleware, ExtrasControllers.indexPsicos);
routes.post("/psico", AuthMiddleware, ExtrasControllers.addPsico);

//Precisa ter um put para atualizar as quantidaes e verificar com o uso de cada dia
routes.get("/testes", AuthMiddleware, ExtrasControllers.indexTestes);
routes.post("/testes", AuthMiddleware, ExtrasControllers.addTeste);

//Controles do dia, caixa e aplicações
routes.post("/caixa", AuthMiddleware, DaysControllers.storeCaixa);
routes.get("/caixa", AuthMiddleware, DaysControllers.showCaixa);

routes.post("/aplicacao", AuthMiddleware, DaysControllers.store);
routes.get("/aplicacao", AuthMiddleware, DaysControllers.show);

module.exports = routes;
