const app = require("./app");
const connectionDB = require("./dbConnect");
require("dotenv").config();
const port = 5000;

app.listen(port, async () => {
  console.log(`Server connected with http://localhost:${port}`);
  await connectionDB();
});
