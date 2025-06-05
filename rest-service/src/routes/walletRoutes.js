const express = require("express");
const {
  registerClient,
  topUpWalletClient,
  checkBalanceClient,
} = require("../controllers/restController");

const router = express.Router();

router.post("/register", registerClient);
router.post("/top-up-wallet", topUpWalletClient);
router.post("/check-balance", checkBalanceClient);

module.exports = router;
