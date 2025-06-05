const express = require("express");
const {
  registerClient,
  topUpWalletClient,
} = require("../controllers/walletController");

const router = express.Router();

router.post("/register", registerClient);
router.post("/top-up-wallet", topUpWalletClient);

module.exports = router;
