const express = require('express');
const router = express.Router();
const controller = require('../controllers/deviceBrowserInsights.controller');
const auth = require("../middleware/auth.middleware");

router.use(auth);

// All endpoints require property context
router.get('/device-usage-metrics', controller.getDeviceUsageMetrics);
router.get('/device-session-summary', controller.getDeviceSessionSummary);
router.get('/browser-usage', controller.getBrowserUsage);
router.get('/blocked-countries', controller.getBlockedCountries);
router.get('/blocked-browsers', controller.getBlockedBrowsers);

// Summary endpoint
router.get('/summary', controller.getInsightsSummary);

module.exports = router;
