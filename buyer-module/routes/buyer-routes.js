const express = require("express");
const { create } = require("../services/buyer-items");
const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const { customerFirstName, customerLastName, address, deliveryPrice, totalFee } = req.body;

    const delivery = {
      customerFirstName,
      customerLastName,
      address,
      deliveryPrice: parseFloat(deliveryPrice),
      totalFee: parseFloat(totalFee),
    };

    console.log(req.body);

    const result = { deliveryPrice: "500" };
    res.json(result);
  } catch (err) {
    console.error(`Error while creating a buyer item`, err.message);
    next(err);
  }
});

module.exports = router;