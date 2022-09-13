const db = require("./db");
const { emptyOrRows } = require("../helpers/helper");
const e = require("express");

const getAll = async () => {
  const query = `SELECT * FROM product`;
  const rows = await db.query(query);
  const data = emptyOrRows(rows);

  return {
    data,
  };
};

const create = async (product) => {
  const query = `INSERT INTO product (name, quantity, price${
    product.imgURI ? ", imgURI" : ""
  }) VALUES ('${product.name}', ${product.quantity}, ${product.price}${
    product.imgURI ? ", '" + product.imgURI + "'" : ""
  })`;

  const result = await db.query(query);

  let message = "Error in creating product";

  if (result.affectedRows) {
    message = "Product created successfully";
  }

  return { message };
};

const update = async (id, product) => {
  let query = `UPDATE product SET `;

  let index = 1;
  let productArr = Object.entries(product);
  for (const [key, value] of productArr) {
    let statement = "";
    if (key === "name" || key === "imgURI") statement = `${key}="${value}"`;
    else statement = `${key}=${value}`;
    if (index !== productArr.length) statement = statement + ", ";
    index++;
    query = query + statement;
  }

  query = query + ` WHERE id=${id}`;

  const result = await db.query(query);

  let message = "Error in updating product";

  if (result.affectedRows) {
    message = "Product updated successfully";
  }

  return { message };
};

const remove = async (id) => {
  const result = await db.query(`DELETE FROM product WHERE id=${id}`);

  let message = "Error in deleting product";

  if (result.affectedRows) {
    message = "Product deleted successfully";
  }

  return { message };
};

module.exports = {
  getAll,
  create,
  update,
  remove,
};
