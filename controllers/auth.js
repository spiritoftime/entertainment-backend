const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const register = async (req, res) => {
  // expects email and password - password would be hashed due to User.pre
  const userDoc = await User.create({ ...req.body });
  const token = userDoc.createJWT();
  res.status(201).json({ email: userDoc.email, token });
};
const login = async (req, res) => {
  const { password, email } = req.body;
  const userDoc = await User.findOne({ email: email });
  if (!userDoc) {
    res.status(404).json({ msg: "Please type in a valid email" });
    return;
  }

  const checkPassword = await userDoc.comparePassword(password);
  if (!checkPassword) {
    res.status(401).json({ msg: "Please type in a valid password" });
    return;
  }
  const token = userDoc.createJWT();
  res.status(201).json({ email: userDoc.email, token, userId: userDoc._id });
};
const verify = async (req, res) => {
  const { token, email } = req.body;
  const decoded = jwt.verify(token, process.env.JWT_SECRET); // returns an error
  if (email !== decoded.name) {
    res.status(401).json({ msg: "Not authorized" });
    return;
  }
  res.status(200).json({ msg: "Authorized" });
};
module.exports = { login, register, verify };
