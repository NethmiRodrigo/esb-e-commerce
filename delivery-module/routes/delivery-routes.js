const express = require("express");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const result = { deliveryPrice: "500" };
    res.json(result);
  } catch (err) {
    console.error(`Error while creating a delivery item`, err.message);
    next(err);
  }
});

module.exports = router;
