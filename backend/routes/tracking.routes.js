const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const { getProperty } = require('../middleware/property');
const trackingController = require('../controllers/tracking.controller');

// Apply auth and property middleware to all routes
//router.use(auth);
// router.use(getProperty);

// GET /snippet - Get tracking script snippet
router.get('/snippet', trackingController.getTrackingSnippet);

// GET /validate - Validate property and get tracking snippet
router.get('/validate', trackingController.validateAndGetSnippet);

module.exports = router;
