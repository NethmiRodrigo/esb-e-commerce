const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { getOne, create } = require("../services/user");
const { jwtKey } = require("../config/config");
const router = express.Router();

router.post("/register", async (req, res, next) => {
  const { email, password, confirmPassword, name, role } = req.body;
  if (password !== confirmPassword)
    return res.status(400).json("Passwords do not match");
  if (role !== "buyer" && role !== "seller")
    return res.status(400).json("Incorrect roles");
  const hashedPassword = await bcrypt.hash(password, 8);
  try {
    const result = await create({
      email,
      password: hashedPassword,
      name,
      role,
    });
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await getOne(email);
    if (user.length == 0) return res.status(404).json("User not found");
    const passwordIsCorrect = await bcrypt.compare(password, user[0].password);
    if (!passwordIsCorrect)
      return res.status(400).json("Incorrect credentials");
    const token = jwt.sign({ user: user[0] }, jwtKey);
    delete user[0].password;
    return res.status(200).json({ user: user[0], token });
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router;
