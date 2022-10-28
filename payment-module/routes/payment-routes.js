const express = require("express");
const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const { cardName, cardNumber, ExpDate, CVN, Fee } = req.body;

    const payload = {
      cardName: cardName,
      cardNumber: cardNumber,
      ExpDate: ExpDate,
      CVN: CVN,
      Fee: Fee,
    };

    const result = { data: "Payment Successful" };

    res.json(result);
  } catch (err) {
    console.error(`Error while creating a delivery item`, err.message);
    next(err);
  }
});

module.exports = router;
