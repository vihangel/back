const express = require("express");
const cors = require("cors");
const routes = require("./routes");
require("dotenv").config();
require("./config/connection");

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.json());

    this.app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Origin", "Get, POST, PUT, DELETE");
      res.header(
        "Access-Control-Allow-Origin",
        "Access, Content-type, Authorization, Accept, Origin, X-Requested-With"
      );

      this.app.use(cors());
      next();
    });
  }

  routes() {
    this.app.use(routes);
  }
}

module.exports = new App().app;
