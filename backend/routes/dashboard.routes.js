const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboard.controller');
const auth = require('../middleware/auth.middleware');

router.use(auth);

// Dashboard endpoints
router.get('/summary', dashboardController.getDashboardSummary);
router.get('/domain', dashboardController.getDomain);
router.get('/metrics', dashboardController.getMetrics);
router.get('/traffic/trends', dashboardController.getTrafficTrends);
router.get('/traffic/day-by-time', dashboardController.trafficDayByTime);
router.get('/traffic/referrals', dashboardController.getReferralTraffic);
router.get('/visitors/countries', dashboardController.getVisitorsByCountry);
router.get('/pages/most-visited', dashboardController.getMostVisitedPages);
router.get('/security/suspicious-activities', dashboardController.getSuspiciousActivities);

module.exports = router;
