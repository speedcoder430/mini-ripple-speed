const express = require("express");
const router = express.Router();
const blockedCountryController = require("../controllers/blockedCountry.controller");
const auth = require("../middleware/auth.middleware");

router.use(auth);

// Block a country for a property
router.post("/block", blockedCountryController.blockCountry);

// Unblock a country for a property
router.post("/unblock", blockedCountryController.unblockCountry);

// List all blocked countries for a specific property
router.get("/all", blockedCountryController.listBlockedCountries);

module.exports = router;
