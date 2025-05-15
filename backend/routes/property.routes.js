const express = require("express");
const router = express.Router();
const propertyController = require("../controllers/property.controller");

// Create a new property
router.post("/", propertyController.createProperty);

// Get all properties
router.get("/all/:userId", propertyController.getAllProperties);

// Get a single property by ID
router.get("/:propertyId", propertyController.getPropertyByPropertyId);

// Update a property
router.put("/:propertyId", propertyController.updateProperty);

// Delete a property
router.delete("/:propertyId", propertyController.deleteProperty);

module.exports = router;
