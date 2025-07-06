// routes/browserBlockRoutes.js
const express = require("express");
const router = express.Router();
const controller = require("../controllers/blockedBrowser.controller");
const auth = require("../middleware/auth.middleware");

router.use(auth);

router.post("/block", controller.setBrowserBlock);          // Block a browser for a property
router.get("/all", controller.getBlockedBrowsers);  // Get blocked browsers for a property
router.post("/unblock", controller.deleteBrowserBlock);     // Unblock a specific browser

module.exports = router;
