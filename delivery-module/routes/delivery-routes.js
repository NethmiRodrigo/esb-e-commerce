const express = require("express");
const { create } = require("../services/delivery-items");
const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const { customerName, customerID, address, items, deliveryPrice } = req.body;

    const delivery = {
      customerName,
      customerID,
      address,
      items,
      deliveryPrice: parseFloat(deliveryPrice),
    };

    const result = { data: "500" };
    res.json(result);
  } catch (err) {
    console.error(`Error while creating a delivery item`, err.message);
    next(err);
  }
});

module.exports = router;
