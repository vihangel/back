const mongoose = require("mongoose");

const URI = process.env.MONGO_URL;

class Connection {
  constructor() {
    this.dataBaseConnectionMongoDB();
  }

  dataBaseConnectionMongoDB() {
    URI =
      "mongodb+srv://angel:psicotran@psicotran.rctxh.mongodb.net/psicotran?retryWrites=true&w=majority";
    this.mongoDBConnection = mongoose
      .connect(URI, {
        useNewUrlParser: true,

        useUnifiedTopology: true,

        // useFindAndModify: false,
        // useCreateIndex: true,
      })
      .then(() => {
        console.log("Conexão estabelicida com o MongoDB");
      })
      .catch((error) => {
        console.log(`Erro ao estabelecer conexão com mongoDB: ${error}`);
      });
  }
}

module.exports = new Connection();
