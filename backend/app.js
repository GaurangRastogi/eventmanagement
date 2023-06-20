const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const port = process.env.PORT||8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//Allow us to pass url-encoded bodies

//Routes
const routes = require("./server/routes/routes");
app.use("/", routes);

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
