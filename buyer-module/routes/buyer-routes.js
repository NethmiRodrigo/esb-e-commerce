const express = require("express");
const { create, createItem } = require("../services/buyer-items");
const router = express.Router();

router.post("/", async (req, res, next) => {
  var digits = "0123456789";
  let orderID = "";
  for (let i = 0; i < 6; i++) {
    orderID += digits[Math.floor(Math.random() * 10)];
  }

  try {
    const { customerFirstName, customerLastName, address, deliveryPrice, totalFee, items } = req.body;

    const buyerItems = {
      customerFirstName,
      customerLastName,
      address,
      deliveryPrice: parseFloat(deliveryPrice),
      totalFee: parseFloat(totalFee),
      items,
      orderID: parseInt(orderID),
    };

    console.log(req.body.items);

    const result = await create(buyerItems);

    for (let i = 0; i < items.length; i++) {
      const result2 = await createItem(orderID, items[i]);
    }

    res.json(result);
  } catch (err) {
    console.error(`Error while creating a buyer item`, err.message);
    next(err);
  }
});

module.exports = router;
