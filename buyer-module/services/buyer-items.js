const db = require("./db");
const e = require("express");

const create = async (deliveryItem) => {
  const query = `INSERT INTO orders (customerFirstName, customerLastName, address, totalFee, orderID, deliveryPrice) 
  VALUES ('${deliveryItem.customerFirstName}', '${deliveryItem.customerLastName}', '${deliveryItem.address}', '${deliveryItem.totalFee}', ${deliveryItem.orderID}, 500 )`;

  const result = await db.query(query);

  let message = "Error in creating product";

  if (result.affectedRows) {
    message = "Product created successfully";
  }

  return { message };
};

const createItem = async (orderID, itemID) => {
  const query = `INSERT INTO items (orderID, itemID) 
  VALUES ( ${orderID}, ${itemID} )`;

  const result = await db.query(query);

  let message = "Error in creating product";

  if (result.affectedRows) {
    message = "Product created successfully";
  }

  return { message };
};

module.exports = {
  create,
  createItem,
};
