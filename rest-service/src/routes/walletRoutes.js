const express = require("express");
const {
  registerClient,
  topUpWalletClient,
} = require("../controllers/restController");

const router = express.Router();

router.post("/register", registerClient);
router.post("/top-up-wallet", topUpWalletClient);

module.exports = router;
