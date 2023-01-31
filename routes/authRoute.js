const express = require("express");
const { login, register, verify } = require("../controllers/auth");
const router = express.Router();
router.post("/signup", register);
router.post("/login", login);
router.post("/verify", verify);
module.exports = router;
