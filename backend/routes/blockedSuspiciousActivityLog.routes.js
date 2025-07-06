const express = require('express');
const router = express.Router();
const blockedSuspiciousActivityLogController = require('../controllers/blockedSuspiciousActivityLog.controller');
const auth = require('../middleware/auth.middleware');

router.use(auth);

// Metrics cards (no change/changeType fields)
router.get('/metrics', blockedSuspiciousActivityLogController.getBlockedIpMetrics);

// Paginated/filterable blocked IPs list
router.get('/blocked-ips', blockedSuspiciousActivityLogController.getBlockedIpsList);

// Offender stats for charts
router.get('/offender-stats', blockedSuspiciousActivityLogController.getOffenderStats);

// Summary endpoint
router.get('/summary', blockedSuspiciousActivityLogController.getSummary);

module.exports = router;
