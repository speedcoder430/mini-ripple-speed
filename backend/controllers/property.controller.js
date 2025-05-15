const validator = require("validator");
const Property = require("../models/property.model");
const { randomUUID } = require("crypto");

// Helper to generate unique propertyId with prefix MR-
const generatePropertyId = () => {
  return `MR-${randomUUID().split("-")[0]}`; // e.g. MR-9f1c2a3b
};
// Create Property
exports.createProperty = async (req, res) => {
  try {
    var { domain, user } = req.body;

    if (!domain || !user) {
      return res
        .status(400)
        .json({ success: false, error: "domain and user are required." });
    }

    // Clean domain input — remove protocol and trailing slashes
    domain = domain
      .toLowerCase()
      .replace(/^https?:\/\//, "")
      .replace(/\/$/, "")
      .replace(/^www\./, "");

    // Validate domain (subdomains allowed)
    if (!validator.isFQDN(domain)) {
      return res.status(400).json({
        success: false,
        error:
          "Invalid domain format. Use a valid domain like 'app.example.com'.",
      });
    }

    // Check if the property is registered first
    const registeredProperty = await Property.findOne({ domain });

    if (registeredProperty) {
      return res.status(403).json({
        success: false,
        error:
          "This domain is registered before. Please use the previous login for it.",
      });
    }

    const propertyId = await generatePropertyId();

    const property = new Property({
      propertyId,
      domain,
      user,
    });

    await property.save();

    res.status(201).json({
      success: true,
      message: "Property created successfully",
      property,
    });
  } catch (error) {
    console.error("Error creating property:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

// Get All Properties
exports.getAllProperties = async (req, res) => {
  const userId = req.params.userId;
  try {
    const properties = await Property.find({ user: userId });
    res.status(200).json({ success: true, properties: properties });
  } catch (error) {
    console.error("Error fetching properties:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

// Get Single Property
exports.getPropertyByPropertyId = async (req, res) => {
  try {
    const { propertyId } = req.params;

    const property = await Property.findOne({ propertyId: propertyId });
    console.log("Property:", property);
    // Check if properties array is empty
    if (!property) {
      return res.status(404).json({
        success: false,
        error: "No properties found",
      });
    }
    console.log("Property:", property);
    res.status(200).json({ success: true, property: property });
  } catch (error) {
    console.error("Error fetching property:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

// Update Property
exports.updateProperty = async (req, res) => {
  try {
    const propertyId = req.params.propertyId;
    var { domain } = req.body;

    // Clean domain input — remove protocol and trailing slashes
    domain = domain
      .toLowerCase()
      .replace(/^https?:\/\//, "")
      .replace(/\/$/, "")
      .replace(/^www\./, "");

    const property = await Property.findOne({ propertyId: propertyId });

    if (!property) {
      return res
        .status(404)
        .json({ success: false, error: "Property not found" });
    }

    if (domain) property.domain = domain;

    await property.save();

    res.status(200).json({
      success: true,
      message: "Property updated successfully",
      property,
    });
  } catch (error) {
    console.error("Error updating property:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

// Delete Property
exports.deleteProperty = async (req, res) => {
  try {
    const { propertyId } = req.params;

    const property = await Property.findOne({ propertyId: propertyId });
    if (!property) {
      return res
        .status(404)
        .json({ success: false, error: "Property not found" });
    }

    const result = await Property.findByIdAndDelete(property._id);

    if (!result) {
      return res
        .status(404)
        .json({ success: false, error: "Property not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Property deleted successfully" });
  } catch (error) {
    console.error("Error deleting property:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
