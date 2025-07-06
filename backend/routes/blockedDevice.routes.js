const express = require("express");
const router = express.Router();
const controller = require("../controllers/blockedDevice.controller");
const auth = require("../middleware/auth.middleware");

router.use(auth);

router.post("/block", controller.setDeviceBlock);
router.get("/all", controller.getDeviceBlock);
router.post("/unblock", controller.deleteDeviceBlock);

module.exports = router;
