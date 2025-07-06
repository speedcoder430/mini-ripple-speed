const express = require("express");
const router = express.Router();
const blockedIPController = require("../controllers/blockedIP.controller");
const auth = require("../middleware/auth.middleware");

router.use(auth);

router.post("/block", blockedIPController.blockIP);
router.post("/unblock", blockedIPController.unblockIP);
router.post("/check", blockedIPController.checkIPStatus);
router.get("/all", blockedIPController.listBlockedIPs);

module.exports = router;
