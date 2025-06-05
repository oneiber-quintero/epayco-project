const express = require("express");
const {
  registerClient,
  topUpWalletClient,
  checkBalanceClient,
  payoutClient,
} = require("../controllers/restController");

const router = express.Router();

router.post("/register", registerClient);
router.post("/top-up-wallet", topUpWalletClient);
router.post("/check-balance", checkBalanceClient);
router.post("/payout", payoutClient);

module.exports = router;
