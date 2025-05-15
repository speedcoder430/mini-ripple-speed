const express = require("express");
const router = express.Router();
const blockedIPController = require("../controllers/blockedIP.controller");

router.post("/block", blockedIPController.blockIP);
router.post("/unblock", blockedIPController.unblockIP);
router.post("/check", blockedIPController.checkIPStatus);
router.get("/:propertyId", blockedIPController.listBlockedIPs);

module.exports = router;
