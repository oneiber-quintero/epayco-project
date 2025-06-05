const express = require("express");
const {
  registerClient,
  topUpWalletClient,
  checkBalanceClient,
  payoutClient,
  confirmPayoutClient,
} = require("../controllers/restController");

const router = express.Router();

router.post("/register", registerClient);
router.post("/top-up-wallet", topUpWalletClient);
router.post("/check-balance", checkBalanceClient);
router.post("/payout", payoutClient);
router.post("/confirm-payout", confirmPayoutClient);

module.exports = router;
