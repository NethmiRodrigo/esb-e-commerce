const express = require("express");
const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const { customerName, customerID, address, items, deliveryPrice } = req.body;

    const result = { data: "Payment Successful" };

    res.json(result);
  } catch (err) {
    console.error(`Error while creating a delivery item`, err.message);
    next(err);
  }
});

module.exports = router;
