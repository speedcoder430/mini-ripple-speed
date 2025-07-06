const express = require('express');
const router = express.Router();
const visitorIpManagementController = require('../controllers/visitorIpManagement.controller');
const auth = require('../middleware/auth.middleware');

// Apply auth middleware to all routes
router.use(auth);

// Get metrics for dashboard cards
router.get('/metrics', visitorIpManagementController.getMetrics);

// Get paginated and filtered visitors
router.get('/visitors', visitorIpManagementController.getVisitors);

// Get summary data (metrics + recent visitors)
router.get('/summary', visitorIpManagementController.getVisitorIpManagementSummary);

module.exports = router;
