const express = require('express');
const router = express.Router();
const trafficAnalyticsController = require('../controllers/trafficAnalytics.controller');
const auth = require('../middleware/auth.middleware');

// Apply property middleware to all routes
router.use(auth);

// Individual traffic analytics endpoints
router.get('/traffic/metrics', trafficAnalyticsController.getBasicMetrics);
router.get('/traffic/peak-hours', trafficAnalyticsController.getPeakTrafficHours);
router.get('/traffic/repeated-visits', trafficAnalyticsController.getRepeatedVisits);
router.get('/traffic/bounce-rate', trafficAnalyticsController.getBounceRateAndSession);
router.get('/traffic/user-types', trafficAnalyticsController.getRealTimeVsReturningUsers);
router.get('/traffic/referral-domains', trafficAnalyticsController.getReferralDomains);

// Combined endpoint to get all traffic analytics data at once
router.get('/traffic/summary', trafficAnalyticsController.getTrafficAnalytics);

module.exports = router;
