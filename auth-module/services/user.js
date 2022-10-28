const db = require("./db");

const getOne = async (email) => {
  const query = `SELECT * FROM user WHERE email = '${email}'`;
  const data = await db.query(query);

  return data;
};

const create = async (user) => {
  const query = `INSERT INTO USER (email, password, name, role) VALUES ('${user.email}', '${user.password}', '${user.name}', '${user.role}')`;

  const result = await db.query(query);

  let message = "Error in creating user";

  if (result.affectedRows) {
    message = "User created successfully";
  }

  return { message };
};

module.exports = {
  getOne,
  create,
};
