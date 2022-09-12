const express = require("express");
const http = require("http");
const {
  createDatabaseConnection,
  destroy,
} = require("./src/database-connection");

const { addProduct } = require("./src/routes");

const { catchErrors } = require("./src/util");

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (_, res) =>
  res.send("Inventory management module is up and running")
);
app.post("/product/add", addProduct);

app.use(catchErrors);

const server = http.createServer(app);

server.listen(port, () => {
  try {
    createDatabaseConnection();
  } catch (error) {
    console.error(error);
    destroy();
  }
  console.log(
    "Inventory management module is running on http://localhost:3000"
  );
});
