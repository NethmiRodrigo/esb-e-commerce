const express = require("express");
const { getAll, create, update, remove } = require("../services/products");
const router = express.Router();

/** Get all products. */
router.get("/", async (req, res, next) => {
  try {
    const result = await getAll();
    res.json(result.data);
  } catch (err) {
    console.error(`Error while getting products `, err.message);
    next(err);
  }
});

/** Add a product */
router.post("/", async (req, res, next) => {
  try {
    const { name, quantity, price, imgURI } = req.body;
    const product = {
      name,
      quantity: parseInt(quantity),
      price: parseFloat(price),
    };
    if (imgURI !== null && imgURI.trim().length > 0) {
      product.imgURI = imgURI;
    }
    const result = await create(product);
    res.json(result);
  } catch (err) {
    console.error(`Error while creating a product`, err.message);
    next(err);
  }
});

/** Update a product */
router.put("/:id", async (req, res, next) => {
  try {
    const result = await update(req.params.id, req.body);
    res.json(result);
  } catch (err) {
    console.error(`Error while updating programming language`, err.message);
    next(err);
  }
});

/** DELETE a product */
router.delete("/:id", async (req, res, next) => {
  try {
    const result = await remove(req.params.id);
    res.json(result);
  } catch (err) {
    console.error(`Error while deleting programming language`, err.message);
    next(err);
  }
});

module.exports = router;
