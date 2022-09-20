const db = require("./db");
const e = require("express");

const create = async (deliveryItem) => {
  const query = `INSERT INTO details (customerFirstName, customerLastName, address, totalFee, deliveryPrice) 
  VALUES ('${deliveryItem.customerFirstName}', '${deliveryItem.customerLastName}', '${deliveryItem.address}', '${deliveryItem.totalFee}', 500 )`;

  const result = await db.query(query);

  let message = "Error in creating product";

  if (result.affectedRows) {
    message = "Product created successfully";
  }

  return { message };
};

module.exports = {
  create,
};
