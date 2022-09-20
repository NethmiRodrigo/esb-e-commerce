const express = require("express");
const { create } = require("../services/delivery-items");
const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const { customerID, customerFirstName, customerLastName, address, deliveryPrice } = req.body;

    const delivery = {
      customerID,
      customerFirstName,
      customerLastName,
      address,
      deliveryPrice: parseFloat(deliveryPrice),
    };

    const result = { deliveryPrice: "500" };
    res.json(result);
  } catch (err) {
    console.error(`Error while creating a delivery item`, err.message);
    next(err);
  }
});

module.exports = router;
