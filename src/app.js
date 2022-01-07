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
      header("Access-Control-Allow-Origin: *");
      header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
      header(
        "Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With"
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
