require("dotenv").config();
const app = require("./src/app");
const connectToDb = require("./src/Config/database");

connectToDb();

app.listen(3000, () => {
  console.log("running on portal 3000");
});
