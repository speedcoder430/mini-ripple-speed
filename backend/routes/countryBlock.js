const express = require('express');
const router = express.Router();
const { isAdmin } = require('../middleware/auth');
const countryBlockController = require('../controllers/countryBlockController');

// Admin routes for managing country blocks
router.get('/blocked-countries', countryBlockController.getBlockedCountries);
router.post('/block', isAdmin, countryBlockController.blockCountry);
router.delete('/unblock/:countryCode', isAdmin, countryBlockController.unblockCountry);
router.post('/override/:countryCode', isAdmin, countryBlockController.addOverride);

module.exports = router; 