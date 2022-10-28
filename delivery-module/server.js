const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const deliveryRoute = require("./routes/delivery-routes");
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

app.get("/", (_, res) => {
  res.json("Delivery module is up and running");
});

app.use("/delivery-items", deliveryRoute);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

app.listen(port, () => {
  console.log(`Delivery module is running on http://localhost:${port}`);
});
