const express = require("express");
const {
  registerClient,
  topUpWalletClient,
  checkBalanceClient,
  payoutClient,
} = require("../controllers/walletController");

const router = express.Router();

router.post("/register", registerClient);
router.post("/top-up-wallet", topUpWalletClient);
router.post("/check-balance", checkBalanceClient);
router.post("/payout", payoutClient);

module.exports = router;
