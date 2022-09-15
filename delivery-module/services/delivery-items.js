const db = require("./db");
const { emptyOrRows } = require("../helpers/helper");
const e = require("express");

const create = async (deliveryItem) => {
  const query = `INSERT INTO details (customerName, customerID, address, items, deliveryPrice) 
  VALUES ('${deliveryItem.customerName}', '${deliveryItem.customerID}', '${deliveryItem.address}', '${deliveryItem.items}', 3250 })`;

  const result = await db.query(query);

  let message = "Error in creating product";

  if (result.affectedRows) {
    message = "Product created successfully";
  }

  return { message };
};
