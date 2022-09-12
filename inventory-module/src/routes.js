const { insert } = require("./database-connection");

const addProduct = (req, res) => {
  const { name, quantity, price } = req.body;
  const result = insert({
    name,
    quantity: parseInt(quantity),
    price: parseInt(price),
  });
  if (result != null) return res.json(result);
  else return res.json("Product added sucessfulyy");
};

module.exports = { addProduct };
