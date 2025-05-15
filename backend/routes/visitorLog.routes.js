const express = require("express");
const router = express.Router();
const visitorLogController = require("../controllers/visitorLog.controller");

// Track a new unique visitor
router.post("/track", visitorLogController.trackVisitor);

// Get single visitor log by ID
router.get("/:id", visitorLogController.getVisitorById);

// Get all visitors for a specific property
router.get("/all/:propertyId", visitorLogController.getVisitorsByPropertyId);

module.exports = router;
