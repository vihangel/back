const app = require("./app");

var PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`App listener on port ${PORT}`);
});
