const mysql = require("mysql");

let connection = null;

const createTable = () => {
  try {
    connection.connect(function (err) {
      if (err) throw err;
      console.log("Executing table creation....");
      const sql =
        "CREATE TABLE IF NOT EXISTS product (name VARCHAR(255) NOT NULL, price INT NOT NULL, quantity INT NOT NULL, imgURI VARCHAR(1000))";
      console.log(sql);
      connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table created");
      });
    });
  } catch (err) {
    console.error(err);
  }
};

const createDatabaseConnection = () => {
  try {
    connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "inventory",
    });
    createTable();
  } catch (error) {
    console.log(error);
  }
};

const destroy = () => {
  connection.end();
};

const insert = (values) => {
  console.log("Executing insert query!");
  const query = `INSERT INTO product (name, quantity, price) VALUES ('${values.name}', ${values.quantity}, ${values.price})`;
  console.log(query);
  connection.query(query, function (err, result) {
    if (err) throw err;
    if (result) return result;
    console.log("1 record inserted");
  });
};

module.exports = {
  createDatabaseConnection,
  destroy,
  insert,
};
