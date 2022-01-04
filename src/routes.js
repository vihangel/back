const { Router } = require("express");
//https://www.youtube.com/watch?v=iJMG5qIYf-A&list=PLZO_SqCI6cXa2kqP-q7je-BEmhcA3ybVo&index=4
const AuthMiddleware = require("./app/midleware/AuthMidleware");
const UserController = require("./app/Controllers/UserController");
const LoginController = require("./app/Controllers/LoginController");

const routes = new Router();

routes.post("/user", AuthMiddleware, UserController.store);
routes.get("/user", AuthMiddleware, UserController.show);

routes.post("/login", LoginController.index);
routes.post("/createAdmin", LoginController.createAdmin);

module.exports = routes;
