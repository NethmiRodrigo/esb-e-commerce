const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const authRoute = require("./routes/auth-routes");
const notEmpty = require("./helpers/not-empty");
const trim = require("./helpers/trim");

const app = express();
const port = 5003;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(notEmpty);
app.use(trim);

app.get("/", (_, res) => {
  res.json("Auth module is up and running");
});
app.use("/auth", authRoute);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

app.listen(port, () => {
  console.log(`Auth module is running on http://localhost:${port}`);
});
