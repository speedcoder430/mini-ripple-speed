const express = require("express");
const router = express.Router();
const controller = require("../controllers/deviceBlock.controller");

router.post("/block", controller.setDeviceBlock);
router.get("/:propertyId", controller.getDeviceBlock);
router.post("/unblock", controller.deleteDeviceBlock);

module.exports = router;
