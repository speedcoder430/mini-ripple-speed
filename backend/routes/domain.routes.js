const express = require("express");
const router = express.Router();
const propertyController = require("../controllers/property.controller");
const firebaseAuth  = require('../middleware/auth');
const { getProperty } = require('../middleware/property');

// Apply auth and property middleware to all routes
// router.use(firebaseAuth);
// router.use(getProperty);

// Connect or update user's domain
router.post("/connect", propertyController.createOrUpdateProperty);

// Connect or update user's domain
router.post("/change", propertyController.createOrUpdateProperty);

// Get user's domain status
router.get("/status",  propertyController.CheckDomainStatus);

// Get user's domain status
router.get("/info",  propertyController.getUserProperty);



module.exports = router;
