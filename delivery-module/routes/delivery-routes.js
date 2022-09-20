const express = require("express");
const { create } = require("../services/delivery-items");
const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const result = { deliveryPrice: "500" };
  } catch (err) {
    console.error(`Error while creating a delivery item`, err.message);
    next(err);
  }
});

module.exports = router;
