const express = require("express");
const { registerClient } = require("../controllers/walletController");

const router = express.Router();

router.post("/register", registerClient);

module.exports = router;
