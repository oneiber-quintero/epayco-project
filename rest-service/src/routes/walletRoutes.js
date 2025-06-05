const express = require("express");
const { registerClient } = require("../controllers/restController");

const router = express.Router();

router.post("/register", registerClient);

module.exports = router;
